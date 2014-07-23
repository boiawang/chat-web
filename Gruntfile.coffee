'use strict';

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    requirejs:
      compile:
        options:
          baseUrl: 'src/js'
          mainConfigFile: 'src/js/main.js'
          paths:
            jquery: '../../lib/jquery.min',
            'smart.ui': '../../lib/smart.ui.min',
            underscore: '../../lib/underscore.min',
            backbone: '../../lib/backbone.min',
            bootstrap: '../../lib/bootstrap.min'
          include: ['require','jquery', 'smart.ui', 'underscore', 'backbone', 'bootstrap','main']
          out: 'dist/js/<%= pkg.name %>.js'

    concat:
      options:
        banner: '/*! APP.common.css@<%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
      js: 
        src: ['src/js/*.js']
        dest: 'dist/js/<%= pkg.name %>.js'
    
    jshint: 
      grunt: 
        src: [ 'Gruntfile.js' ]
        options: 
          jshintrc: '.jshintrc'

      dist: 
        src: 'dist/js/<%= pkg.name %>.js'
        options: 
          jshintrc: 'src/.jshintrc'

    sass: 
      dist: 
        files: 
          'public/css/<%= pkg.name %>.css': 'public/sass/main.scss'
        
        options: 
          sourcemap: 'true'
   
    uglify:
      options: 
        banner: "/*! <%= pkg.name %> <%= pkg.version %> */\n"
      release: 
        files:
          'dist/js/<%= pkg.name %>.min.js': 'dist/js/<%= pkg.name %>.js'

    cssmin: 
      combine: 
        files: 
          'public/css/<%= pkg.name %>.min.css': 'public/css/<%= pkg.name %>.css'

    qunit:
      all: ['test/index.html']
  
    watch:
      script:
        files: ['public/sass/**/*.scss', 'Gruntfile.coffee']
        tasks: ['sass', 'cssmin']


  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['sass','cssmin','watch']
