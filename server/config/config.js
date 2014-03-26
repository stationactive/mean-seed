/**
 * Created by developer on 3/21/14.
 */
var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../'); //up 2 dir to main dir

module.exports = {
    development: {
        db: 'mongodb://localhost/pushstuff',
        port: process.env.PORT || 4242,
        rootPath: rootPath

    },
    production: {
        db: '',
        port: process.env.PORT || 80,
        rootPath: rootPath
    }
}
