/*!============================================================
 * Send Mail - jQuery plugin
 * Copyright (c) 2018 Federico Cargnelutti <fedecarg@gmail.com>
 * http://www.fedecarg.com/
 ============================================================*/

(function($) {

  $.fn.sendmail = function() {

    // Set jQuery DOM elements
    const $window = $(window);
    const $name = this.find('.contact-form__name');
    const $email = this.find('.contact-form__email');
    const $message = this.find('.contact-form__message');
    const $submitButton = $('.submit__button');
    const $errorMessage = this.find('.contact-form__error-message');
    const $successMessage = this.find('.contact-form__success-message');

    function initialise() {
      bindEvents();
    }

    function bindEvents() {
      $submitButton.on('click', onSubmit);
    }

    function onSubmit(e) {
      e.preventDefault();

      hideErrorMessage();
      hideSuccessMessage();

      if (getCookie('email-sent')) {
        showErrorMessage('You have reached a limit for sending email');
      } else if (!isValidName()) {
        showErrorMessage('Please enter your full name');
      } else if (!isValidEmail()) {
        showErrorMessage('Please enter a valid email address');
      } else if (!isValidMessage()) {
        showErrorMessage('The message you have entered is too short');
      } else {
        const params = {
          name: $name.val(),
          email: $email.val(),
          message: $message.val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://www.kewnode.com/api/email',
            data: jQuery.param(params),
            success: (data) => {
              resetFormFields();
              setCookie('email-sent', true);
              showSuccessMessage('Thank you for getting in touch. If your message is urgent you may also contact me at http://twitter.com/fedecarg');
            },
            error: () => {
              showErrorMessage('Unable to send message');
            }
        });
      }
    }

    function resetFormFields() {
      $name.val('');
      $email.val('');
      $message.val('');
    }

    function showErrorMessage(message) {
      $errorMessage
        .hide()
        .text(message)
        .fadeIn();
    }

    function hideErrorMessage() {
      $errorMessage
        .text('')
        .fadeOut();
    }

    function showSuccessMessage(message) {
      $successMessage
        .hide()
        .text(message)
        .fadeIn();
    }

    function hideSuccessMessage() {
      $successMessage
        .text('')
        .fadeOut();
    }

    function isValidEmail() {
      const filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
      return filter.test($email.val());
    }

    function isValidName() {
        return $name.val().length > 5;
    }

    function isValidMessage() {
        return $message.val().length > 20;
    }

    function setCookie(name, value) {
      document.cookie = name + "=" + value + "; path=/";
    }

    function getCookie(name) {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');

      for (let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) == 0) {
          return c.substring(nameEQ.length,c.length);
        }
      }

      return null;
    }

    initialise();
  };

}(jQuery));
