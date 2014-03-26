/**
 * Created by developer on 3/21/14.
 */
var mongoose = require('mongoose')
    models = require('../models');

module.exports = function(config){
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Database error ..'));
    db.once('open', function callback(){
        console.log('pushmystuff db open');
    });


    models.User.seed();

}

