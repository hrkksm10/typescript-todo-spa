module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks("grunt-tslint");
    grunt.loadNpmTasks('grunt-contrib-handlebars');

    grunt.initConfig({
        shell: {
            tsc: {
                command: 'node node_modules/typescript/bin/tsc -p tsconfig.json'
            }
        },
        requirejs: {
            compile: {
                options: {
                    name: 'main',
                    baseUrl: 'src/',
                    mainConfigFile: 'src/main.js',
                    out: 'dist/main.build.js',
                    optimize: 'none'
                    // findNestedDependencies: true
                }
            }
        },
        tslint: {
            options: {
                configuration: 'tslint.json',
                force: false,
                fix: false
            },
            files: {
                src: [
                    'src/**/*.ts',
                    '!src/lib/**',
                    '!src/types/**'
                ]
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: function(filepath) {
                        const pieces = filepath.split('/'), index = pieces.indexOf('src') + 2;
                        return pieces.slice(index, -1).join('.');
                    },
                    processName: function(filepath) {
                        const pieces = filepath.split('/');
                        return pieces[pieces.length - 1].replace(/.hbs$/, '');
                    },
                    amd: true
                },
                files: {
                    'src/templates/hbs_templates.js': ['src/templates/hbs/**/*.hbs']
                }
            }
        }
    });

    grunt.registerTask('default', ['shell', 'handlebars', 'requirejs']);
};
