/**
 * Created by developer on 3/23/14.
 */
module.exports = function(grunt){
    //load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        distFolder: 'public/dist',

        pkg: grunt.file.readJSON('package.json'),

        clean: ["public/dist/js"],

        concat: {
            options: {
                seperator: ';'
            },
            assets:{
                src: [
                    'public/bower_components/jquery/dist/jquery.min.js',
                    'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'public/bower_components/toastr/toastr.min.js',
                    'public/bower_components/angular/angular.js',
                    'public/bower_components/angular-route/angular-route.min.js',
                    'public/bower_components/angular-resource/angular-resource.min.js',
                    'public/bower_components/lodash/dist/lodash.min.js',
                    'public/bower_components/restangular/dist/restangular.min.js'
                ],
                dest: '<%= distFolder %>/js/assets.js'
            },
            dist: {
                src: [
                    'public/src/scripts/app.js',
                    'public/src/scripts/controllers/**/*.js',
                    'public/src/scripts/services/**/*.js'

                ],
                dest: '<%= distFolder %>/js/main.js'
            }
        },

        watch: {
            js: {
                files: ['Gruntfile.js', 'public/src/scripts/**/*.js'],
                tasks: ['concat']
            }
        }
    });

//    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['clean', 'concat', 'watch']);




}
