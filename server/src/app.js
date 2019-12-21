const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const logger = require('morgan');

module.exports = function () {
    let server = express(),
        create,
        start;

    create = (db) => {
        let routes = require('../routes');
        // set all the server things
        server.set('env', process.env.ENV);
        server.set('port', process.env.PORT);
        server.set('hostname', process.env.HOST);

        // add logger
        server.use(logger('dev'));        
        
        // add middleware to parse the json
        server.use(bodyParser.json());
        server.use(expressValidator())
        server.use(bodyParser.urlencoded({
            extended: false
        }));

        //connect the database
        mongoose.Promise = global.Promise;

        mongoose.connect(
            db.database,
            { 
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
		        useUnifiedTopology: true
            }
        );

        // Set up routes
        routes.init(server);
    };

    
    start = () => {
        let hostname = server.get('hostname'),
            port = server.get('port');
        server.listen(port, function () {
            console.log('Express server listening on - http://' + hostname + ':' + port);
        });
    };
    return {
        create: create,
        start: start
    };
};