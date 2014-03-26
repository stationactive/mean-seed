/**
 * Created by developer on 3/24/14.
 */
var crypto = require('crypto');

exports.generateSalt = function(){
    return crypto.randomBytes(128).toString('base64');
}

exports.generateHash = function(salt, password){
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(password).digest('hex');
}