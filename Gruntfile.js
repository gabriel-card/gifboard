(function(){
    "use strict";
}());
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: 'rn'
            },
            dist: {
                src: [], // add every js here
                dest: 'assets/js/main.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! &lt;%= pkg.name %&gt; &lt;%= grunt.template.today("dd-mm-yyyy") %&gt; */n'
            },
            dist: {
                files: {
                    'core/static/js/main.min.js': ['&lt;%= concat.dist.dest %&gt;']
                }
            }
        },
        jshint: {
            files:['Gruntfile.js', 'assets/js/*.js', 'static/js/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'assets/scss',
                    cssDir: 'core/static/css',
                    relativeAssets: true,
                    httpPath: '/',
                    environment: 'production',
                    outputStyle: 'compressed'
                }
            }
        },
        watch: {
            files: ['&lt;%= jshint.files %&gt;', 'assets/scss/**/*.scss'],
            tasks: ['concat', 'uglify', 'jshint', 'compass']
        },
        jasmine: {
            src: 'assets/js/*.js',
            options: {
                vendor: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
                ],
                specs: 'tests/spec/*Spec.js',
                helpers: 'tests/spec/*Helper.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'compass', 'watch']);
    grunt.registerTask('test', ['jshint', 'jasmine']);
};
