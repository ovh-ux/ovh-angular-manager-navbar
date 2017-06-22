module.exports = function (grunt) {
    'use strict';
    require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg      : grunt.file.readJSON('package.json'),
        bower    : grunt.file.readJSON('bower.json'),
        distdir  : 'dist',
        srcdir   : 'src',
        builddir : '.work/.tmp',
        name     : grunt.file.readJSON('package.json').name || 'ovh-angular-manager-navbar',   // module name

        // Obfuscate
        uglify   : {
            js : {
                options : {
                    banner : '/*! <%= pkg.name %> - <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files   : {
                    '<%= distdir %>/ovh-angular-manager-navbar.min.js' : '<%= builddir %>/ovh-angular-manager-navbar.js'
                }
            }
        },

        copy       : {
            dist : {
                files : [
                    {
                        expand : true,
                        cwd    : '<%= builddir %>',
                        src    : 'ovh-angular-manager-navbar.js',
                        dest   : '<%= distdir %>/'
                    }
                ]
            }
        },

        // Clean
        clean      : {
            dist : {
                src : [
                    '<%= builddir %>',
                    '<%= distdir %>/*.js'
                ]
            }
        },

        // JS Check
        jshint     : {
            options : {
                jshintrc : '.jshintrc'
            },
            js      : [
                '<%=srcdir%>/*.js',
                '<%=srcdir%>/*/*.js',
                '!<%=srcdir%>/*.spec.js'
            ]
        },

        // Concatenation
        concat     : {
            dist : {
                files : {
                    '<%= builddir %>/ovh-angular-manager-navbar.js' : [
                        '<%=srcdir%>/ovh-angular-manager-navbar.js',
                        '<%=srcdir%>/ovh-angular-manager-navbar.service.js',
                        '<%=srcdir%>/ovh-angular-manager-navbar.directive.js',
                        '<%= builddir %>/tpls.js'
                    ]
                }
            }
        },

        // Check complexity
        complexity : {
            generic : {
                src     : [
                    '<%=srcdir%>/*.js',
                    '<%=srcdir%>/*/*.js'
                ],
                options : {
                    errorsOnly      : false,
                    cyclomatic      : 12,
                    halstead        : 45,
                    maintainability : 82
                }
            }
        },

        ngdocs: {
            options: {
                dest: 'docs',
                html5Mode: false,
                title: '<%= name %>',
                startPage: '/api/<%= name %>.<%= name %>',
                sourceLink : "https://github.com/ovh-ux/<%= name %>/blob/master/{{file}}#L{{codeline}}"
            },
            api: {
                src: ['<%=srcdir%>/**/*.js'],
                title: 'api'
            }
        },

        ngAnnotate: {
            dist: {
                files: {
                    '<%= builddir %>/<%= name %>.js' : ['<%= builddir %>/<%= name %>.js']
                }
            }
        },

        ngtemplates: {
            options: {
                module: '<%= name %>',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            dist: {
                cwd    : '<%= srcdir %>/',
                src    : ['**/*.html'],
                dest   : '<%= builddir %>/tpls.js'
            }
        },

        // To release
        bump       : {
            options : {
                pushTo        : 'origin',
                files         : [
                    'package.json',
                    'bower.json'
                ],
                updateConfigs : ['pkg', 'bower'],
                commitFiles   : ['-a']
            }
        },

        // Testing
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.registerTask("default", ["build"]);
    grunt.task.renameTask("watch", "delta");
    grunt.registerTask("watch", ["build", "delta"]);

    grunt.registerTask("test", function () {
        grunt.task.run([
            "clean",
            "jshint",
            "complexity",
            "karma"
        ]);
    });

    grunt.registerTask("build", [
        "clean",
        "ngtemplates",
        "concat:dist",
        "ngAnnotate",
        "uglify",
        "copy:dist",
        "ngdocs"
    ]);


    // Increase version number. Type = minor|major|patch
    grunt.registerTask("release", "Release", function () {
        var type = grunt.option("type");

        if (type && ~["patch", "minor", "major"].indexOf(type)) {
            grunt.task.run(["bump-only:" + type]);
        } else {
            grunt.verbose.or.write("You try to release in a weird version type [" + type + "]").error();
            grunt.fail.warn("Please try with --type=patch|minor|major");
        }
    });

};
