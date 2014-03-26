/**
 * Created by developer on 3/21/14.
 */
var mongoose = require('mongoose'),
    shortid = require('shortid'),
    encrypt = require('../utils/encryption');

var UserSchema = mongoose.Schema({
    _id: {type: String, default: function(){return shortid.generate()}},
    username: {type: String, required: '{PATH} is required!', unique: true},
    password: String,
    firstname: {type: String, required: '{PATH} is required!'},
    lastname: {type: String, required: '{PATH} is required!'},
    salt: String,
    hashed_pwd: {type: String, required: 'Password is required!'},
    roles: [String]

});

UserSchema.methods = {
    authenticate: function(passwordToMatch){
        return encrypt.generateHash(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role){
        return this.roles.indexOf(role) > -1;
    }
}

var User = mongoose.model('User', UserSchema);

function seedUsers(){
    User.find({}).exec(function(e, docs){
        if(docs.length === 0){
            var salt, hash;
            salt = encrypt.generateSalt();
            hash = encrypt.generateHash(salt, '123');
            User.create({username: 'pato@pato.com', firstname: 'Patrick', lastname: 'Mukasa', salt: salt, hashed_pwd: hash, roles: ['admin']});
            User.create({username: 'bob@bob.com', firstname: 'Bob', lastname: 'Dilan', salt: salt, hashed_pwd: hash, roles: [] });
            User.create({username: 'mary@mary.com', firstname: 'Mary', lastname: 'Small', salt: salt, hashed_pwd: hash});
        }
    });
}

exports.seed = seedUsers;