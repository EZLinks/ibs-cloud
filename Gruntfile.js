'use strict';

var os = require('os'),
    path = require('path'),
    http = require('http'),
    fs = require('fs'),
    async = require('async'),
    args = require('yargs').argv;

module.exports = function (grunt) {
    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        cssmin: 'grunt-contrib-cssmin'
    });
    
    // Configurable paths for the application
    var appConfig = {
        app: 'src',
        dist: 'dist'
    };
    
    // Define the configuration for all the tasks
    grunt.initConfig({
        // Project settings
        yeoman: appConfig,
        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: path.normalize(__dirname + '/.jshintrc'),
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/**/*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },
        
        // Empty dist folder for new build
        clean: {
            dist: {
                options : {
                    force : true
                },
                src : ['<%= yeoman.dist %>/{,*/}*']
            },
			server: '.tmp'
        },
        
        // Add vendor prefixed styles
        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core')({ browsers: ['last 1 version'] })
                ]
            },
            server: {
                options: {
                    map: true
                },
                files: [{
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }]
            },
            dist: {
                files: [{
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: ['<%= yeoman.app %>/index.html'],
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['concat', 'cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        
        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            css: ['<%= yeoman.dist %>/{,*/}*.css'],
            js: ['<%= yeoman.dist %>/{,*/}*.js']
        },
        
        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat',
                    src: ['*.css'],
                    dest: '.tmp/concat',
                    ext: '.min.css'
                }]
            }
        },
        
        /* jshint ignore:start */
        uglify: {
            scripts_js: {
                options: {
                    preserveComments: false,
                    mangle: true,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    '.tmp/concat/ibs-cloud.min.js': [
                        '.tmp/concat/ibs-cloud.js'
                    ]
                }
            }
        },
        /* jshint ignore:end */
        
        ngtemplates: {
            dist: {
                options: {
                    module: 'ibs.cloud',
                    usemin: 'ibs-cloud.js'
                },
                cwd: '<%= yeoman.app %>',
                src: ['views/**/*.html', 'template/**/*.html', 'scripts/**/*[^\.]*?.html', 'uib/template/**/*.html'],
                dest: '.tmp/templateCache.js'
            }
        },
        
        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                        expand: true,
                        cwd: '.tmp/concat/',
                        src: '*.js',
                        dest: '.tmp/concat/'
                    }]
            }
        },
        
        copy: {
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            scripts: {
                expand: true,
                cwd: '.tmp/concat',
                dest: '<%= yeoman.dist %>',
                src: '**'
            }
        },
        
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles'
            ]
		},

		karma: {
			unit: {
				configFile: 'test/karma.conf.js',
				singleRun: true
			}
		}
    });
    
    
    grunt.registerTask('build', [
        'jshint:all',
        'clean',
        'useminPrepare',
        'concurrent:dist',
        'postcss',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'cssmin',
        'uglify',
        'usemin',
        'copy:scripts'
    ]);

	grunt.registerTask('test', [
		'build',
		'karma:unit'
	]);
};
