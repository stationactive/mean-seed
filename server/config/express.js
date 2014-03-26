/**
 * Created by developer on 3/21/14.
 */
var express = require('express'),
    stylus = require('stylus'),
    passport = require('passport');

module.exports = function(app, config){

    function compile(stc, path){
        return stylus(stc).set('filename', path);
    }

    app.configure(function(){
        app.set('views', config.rootPath + '/server/views');
        app.set('view engine', 'jade');
        app.set('controllers', config.rootPath + '/server/controllers');

        app.use(express.logger('dev'));
        app.use(express.cookieParser());
        app.use(express.bodyParser());
        app.use(express.session({secret: 'S3CR3T S35510N C0D3'}));
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(stylus.middleware({
            src: __dirname + '/app',
            compile: compile
        }));
        app.use(express.static(config.rootPath + '/public'));
    });
}