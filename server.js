/**
 * Created by developer on 3/18/14.
 */
var express = require('express'),
    stylus = require('stylus'),
    Resource = require('express-resource-new');

require('express-namespace');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/routes')(app);



app.listen(config.port);
console.log('Server running @ http://localhost:' + config.port);

