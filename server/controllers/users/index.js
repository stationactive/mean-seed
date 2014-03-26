/**
 * Created by developer on 3/21/14.
 */
var User = require('mongoose').model('User'),
    encrypt = require('../../utils/encryption');

module.exports = {
    index: function(req, res){
        User.find({}).exec(function(e, docs){
            res.send(docs);
        });
    },
    show: function(req, res){
        User.findOne({_id: req.params.user}).exec(function(e, doc){
            res.send(doc);
        })
    },
    create: function(req, res, next){
        var userData = new User(req.body);
        userData.username = userData.username.toLowerCase();
        userData.salt = encrypt.generateSalt();
        userData.hashed_pwd = encrypt.generateHash(userData.salt, userData.password);

        User.create(userData, function(e, user){
            if(e){
                //duplicate
                if(e.toString().indexOf('E11000') > -1){
                    e = new Error(' User '+ userData.username +' already exsits');
                }
                res.status(400);
                return res.send({reason: e.toString()})
            }

            req.logIn(user, function(e){
                if(e) {return next(e);}
                res.send(user);
            })
        })

    },
    update: function(req, res){
        var userUpdates = req.body;
        res.send(userUpdates._id);

        if(req.user._id != userUpdates._id && !req.user.hasRole('admin')){
            res.status(403);
            return res.end();
        }

//        req.user.username = userUpdates.username;
        req.user.firstname = userUpdates.firstname;
        req.user.lastname = userUpdates.lastname;
        if(userUpdates.password && userUpdates.password.length > 0){
            req.user.salt = encrypt.generateSalt();
            req.user.hashed_pwd = encrypt.generateHash(req.user.salt, userUpdates.password);
        }

        req.user.save(function(e){
            if(e){
                res.status(400);
                return res.send({reason: e.toString()});
            }
            res.send(req.user);
        });



    },
    destroy: function(req, res){
        res.send('deleting');
    }
}
