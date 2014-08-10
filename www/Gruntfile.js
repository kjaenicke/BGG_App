module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: ['bower_components/requirejs/require.js'],
            dest: 'bower_dist/requirejs/',
            filter: 'isFile', flatten: true
          },
          {
            expand: true,
            src: ['bower_components/underscore/underscore.js'],
            dest: 'bower_dist/underscore/',
            filter: 'isFile', flatten: true
          },
          {
            expand: true,
            src: ['bower_components/handlebars/handlebars.amd.min.js'],
            dest: 'bower_dist/handlebars/',
            filter: 'isFile', flatten: true
          },
          {
            expand: true,
            cwd: 'bower_components/require-handlebars-plugin/',
            src: ['hbs.js', 'hbs/*'],
            dest: 'bower_dist/require-handlebars-plugin/'
          },
          {
            expand: true,
            src: ['bower_components/jquery/dist/*'],
            dest: 'bower_dist/jquery',
            filter: 'isFile', flatten: true
          },
          {
            expand: true,
            src: ['bower_components/marionette/lib/*'],
            dest: 'bower_dist/marionette',
            filter: 'isFile', flatten: true
          },
          {
            expand: true,
            src: ['bower_components/backbone/backbone.js'],
            dest: 'bower_dist/backbone',
            filter: 'isFile', flatten: true
          },
          {
            expand: true,
            src: [
              'bower_components/framework7/dist/css/framework7.min.css',
              'bower_components/framework7/dist/js/framework7.min.js'
            ],
            dest: 'bower_dist/f7',
            filter: 'isFile', flatten: true
          },
          {
            expand: true,
            cwd: 'bower_components/fontawesome/',
            src: ['css/font-awesome.min.css', 'fonts/*'],
            dest: 'bower_dist/fontawesome'
          }
        ]
      }
    },
    jshint:{
      all: ['./js/**/*.js']
    },
    clean: {
      build: ['bower_dist'],
      release: ['bower_components']
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      },
      combine: {
        files: {
          'css/compile.min.css': ['css/ico.min.css','css/index.min.css','css/app.min.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['cssmin', 'copy', 'jshint']);
  grunt.registerTask('jscopy', 'copy');
  grunt.registerTask('release', ['clean:build', 'cssmin', 'copy', 'clean:release', 'jshint']);

};
