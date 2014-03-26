/**
 * Created by developer on 3/21/14.
 */
var auth = require('./auth');

module.exports = function(app){
    //Authentication
    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    });

    //API
    //general
    app.namespace('/api/v1', function(){
       app.resource('users');
    });

    //secure

    app.namespace('/api/v1/secure', auth.requiresApiLogin,function(){
        app.resource('users');
    });

    //admin
    app.namespace('/api/v1/secure/admin', auth.requiresRole('admin'), function(){
        app.resource('users');
    });

    //Angular
    app.get('/partials/*', function(req, res){
        res.render('../../public/' + req.params);
    })

    //catch anyother
    app.all('/api/*', function(req, res){
        res.send(404);
    });


    app.get('*', function(req, res){
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}
