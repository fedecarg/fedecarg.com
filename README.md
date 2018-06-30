## SPA

### URL
http://www.fedecarg.com/

### Install

```bash
$ git clone https://github.com/fedecarg/fedecarg.com.git
$ cd fedecarg.com
$ npm install
```

### Build

```bash
$ grunt build
Running "clean:beforeBuild" (clean) task
>> 1 path cleaned.

Running "jshint:files" (jshint) task

✔ No problems


Running "concat:dist" (concat) task

Running "browserify:dist" (browserify) task
>> Bundle dist/js/app-1.0.0.min.js created.

Running "uglify:dist" (uglify) task
>> 1 file created 9.67 kB → 4.05 kB

Running "cssmin:build" (cssmin) task
>> 1 file created. 16.34 kB → 12.01 kB

Running "autoprefixer:dist" (autoprefixer) task
>> 1 autoprefixed stylesheet created.

Running "copy:js" (copy) task
Copied 1 file

Running "copy:css" (copy) task
Copied 2 files

Running "copy:images" (copy) task
Copied 10 files

Running "copy:webfonts" (copy) task
Copied 12 files

Running "targethtml:dist" (targethtml) task
>> File "dist/index.html" created.

Running "clean:afterBuild" (clean) task
>> 0 paths cleaned.

Done.
```

