module.exports = function(grunt) {


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            main: {
                src: [
                    'src/**/*.js', 'async/**/*.js', 'await/**/*.js', 'yield/**/*.js', 'tests/**/*.js',
                    'src/**/*.js.map', 'async/**/*.js.map', 'await/**/*.js.map', 'yield/**/*.js.map', 'tests/**/*.js.map'
                ]
            }
        },

        typescript: {
            main: {
                src: [
                    'src/**/*.ts',
                    'async/**/*.ts',
                    'await/**/*.ts',
                    'yield/**/*.ts',
                    'tests/**/*.ts'
                ],
                dest: '.',
                options: {
                    target: 'es5',
                    module: 'commonjs',
                    sourceMap: true,
                    declaration: false,
                    comments: true
                }
            }
        },

        copy: {
            main: {
                expand: true,
                src: ['src/**/*.js', 'async/**/*.js', 'await/**/*.js', 'yield/**/*.js', 'index.js'],
                dest: 'node_modules/asyncawait'
            }
        },

        mochaTest: {
            main: {
                options: { reporter: 'list' },
                src: ['tests/**/*.js']
            }
        },

        shell: {
            bench: {
                command: 'node comparison/benchmark.js'
            }
        },

        findts: {
            main: { }
        }

    });


    // Load grunt tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-findts');

    // Register task aliases and the default task
    grunt.registerTask('build', ['typescript:main', 'copy:main']);
    grunt.registerTask('test', ['mochaTest:main']);
    grunt.registerTask('bench', ['shell:bench']);
    grunt.registerTask('default', ['build', 'test']);
};
