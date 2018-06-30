/*!============================================================
 * Grunt Task Runner
 * Copyright (c) 2018 Federico Cargnelutti <fedecarg@gmail.com>
 * http://www.fedecarg.com/
 ============================================================*/
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    config: {
      sourceDir: 'src',
      outputDir: 'dist',
      cssBundleFilename: 'app-<%= pkg.version %>.min.css',
      jsBundleFilename: 'app-<%= pkg.version %>.min.js',
    },

    /**************************************************************************
     * NPM: grunt-contrib-jshint
     *************************************************************************/
    jshint: {
      files: [ 'Gruntfile.js' ],
      options: {
        reporter: require('jshint-stylish'),
        globals: {
          jQuery: true,
          console: true,
          module: true,
          window: true,
          document: true
        }
      }
    },

    /**************************************************************************
     * NPM: grunt-contrib-concat
     *************************************************************************/
    concat: {
      dist: {
        files: {
          '<%= config.outputDir %>/js/<%= config.jsBundleFilename %>': [
            '<%= config.sourceDir %>/js/*.js',
            '!<%= config.sourceDir %>/js/vendor/*'
          ]
        }
      }
    },

    /**************************************************************************
     * NPM: grunt-browserify
     *************************************************************************/
    browserify: {
      dist: {
        browserifyOptions : {
          debug: true
        },
        options: {
          'transform': [['babelify', { 'presets': ['@babel/preset-env'] }]]
        },
        files: {
          '<%= config.outputDir %>/js/<%= config.jsBundleFilename %>': '<%= config.outputDir %>/js/<%= config.jsBundleFilename %>'
        }
      }
    },

    /**************************************************************************
     * NPM: grunt-contrib-uglify
     *************************************************************************/
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */',
        compress: {
          drop_console: true
        }
      },
      dist: {
        files: {
          '<%= config.outputDir %>/js/<%= config.jsBundleFilename %>': '<%= config.outputDir %>/js/<%= config.jsBundleFilename %>'
        }
      }
    },

    /**************************************************************************
     * NPM: grunt-contrib-cssmin
     *************************************************************************/
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */'
      },
      build: {
        files: {
          '<%= config.outputDir %>/css/<%= config.cssBundleFilename %>': [
            '<%= config.sourceDir %>/css/{,**/}*.css',
            '!<%= config.sourceDir %>/css/{,**/}*.min.css'
          ]
        }
      }
    },

    /**************************************************************************
     * NPM: grunt-autoprefixer
     *************************************************************************/
    autoprefixer: {
      options: {
        browsers: [ '> 1%', 'last 2 version' ]
      },
      dist: {
        files: {
          '<%= config.outputDir %>/css/<%= config.cssBundleFilename %>': '<%= config.outputDir %>/css/<%= config.cssBundleFilename %>'
        }
      }
    },

    /**************************************************************************
     * NPM: grunt-contrib-copy
     *************************************************************************/
    copy: {
      js: {
        files: [{
          cwd: '<%= config.sourceDir %>/js/',
          src: 'vendor/*.min.js',
          dest: '<%= config.outputDir %>/js/',
          expand: true
        }]
      },
      css: {
        files: [{
          cwd: '<%= config.sourceDir %>/css/',
          src: 'vendor/*.min.css',
          dest: '<%= config.outputDir %>/css/',
          expand: true
        }]
      },
      images: {
        files: [{
          cwd: '<%= config.sourceDir %>/images',
          src: '*.{png,jpg,jpeg,gif,svg,ico}',
          dest: '<%= config.outputDir %>/images/',
          expand: true
        }]
      },
      webfonts: {
        files: [{
          cwd: '<%= config.sourceDir %>/webfonts',
          src: '*.{woff,woff2,eot,otf,ttf,svg}',
          dest: '<%= config.outputDir %>/webfonts/',
          expand: true
        }]
      }
    },

    /**************************************************************************
     * NPM: grunt-targethtml
     *************************************************************************/
    targethtml: {
      options: {
        curlyTags: {
          version: '<%= pkg.version %>'
        }
      },
      dist: {
        files: {
          '<%= config.outputDir %>/index.html': '<%= config.sourceDir %>/index.html'
        }
      }
    },

    /**************************************************************************
     * NPM: grunt-contrib-clean
     *************************************************************************/
    clean: {
      beforeBuild: {
        src: [ '<%= config.outputDir %>/' ]
      },
      afterBuild: {
        src: [
          '<%= config.outputDir %>/css/*.tmp.css'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-targethtml');

  grunt.registerTask('build', [
    'clean:beforeBuild',
    'jshint',
    'concat',
    'browserify:dist',
    'uglify',
    'cssmin',
    'autoprefixer',
    'copy',
    'targethtml',
    'clean:afterBuild'
  ]);

  grunt.registerTask('default', [ 'build' ]);
};
