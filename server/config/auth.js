/**
 * Created by developer on 3/21/14.
 */
var passport = require('passport');

exports.authenticate = function(req, res, next){
    req.body.username = req.body.username.toLowerCase();

    var auth =  passport.authenticate('local', function(e, user){
        if(e) { return next(e)};
        if(!user) {res.send({success: false})};
        req.logIn(user, function(e){
            if(e) { return next(e)};
            res.send({success: true, user: user});
        });
    });

    auth(req, res, next);
};

exports.requiresApiLogin = function(req, res, next){
    if(!req.isAuthenticated()){
        res.status(403);
        res.end();
    }else{
        next();
    }
};

exports.requiresRole = function(role){
    return function(req, res, next){
       if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1){
           res.status(403);
           res.end();
       }else{
           next();
       }
    }
}
