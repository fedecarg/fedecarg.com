/*!============================================================
 * main.js
 * Copyright (c) 2018 Federico Cargnelutti <fedecarg@gmail.com>
 * http://www.fedecarg.com/
 ============================================================*/

(($) => {

  class App {

    constructor() {
      this.$window = $(window);
      this.$document = $(document);
      this.$home = $('.home');
      this.$preloader = $('.preloader__container');

      this.$home.ready(() => {
        this.onElementReady();
      });

      this.$document.ready(() => {
        this.onDocumentReady();
      });
    }

    onElementReady() {
      const navbarStickyPosY = 600;
      const windowHeight = this.$window.height();

      if (windowHeight > navbarStickyPosY) {
        this.$home.css('height', windowHeight);
      }

      this.$preloader.fadeOut();
    }

    onDocumentReady() {
      $('nav').stickynav();
      $('form').sendmail();

      this.$preloader.hide();
    }
  }

  new App();

})(jQuery);