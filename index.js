'use strict'

var Hapi = require('hapi');
var Mongoose = require('mongoose');
var redisClient = require('redis-connection')();

redisClient.set('redis', 'working');
redisClient.get('redis', function (rediserror, reply) {
  if(rediserror) {
    console.log(rediserror);
  }
  console.log('redis is ' +reply.toString());
});

Mongoose.connect('mongodb://127.0.0.1/api_hapi');
Mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
Mongoose.connection.on('error', (err) => {
  console.log('Error while connecting to MongoDB', err);
});

var validate = function (decoded, request, callback) {
  redisClient.get(decoded.id, function (rediserror, reply) {
    console.log(decoded.id);
    if(rediserror) {
      console.log(rediserror);
    }
    var session;
    if(reply) {
      session = JSON.parse(reply);
    }
    else {
      return callback(rediserror, false);
    }
    if (session.valid === true) {
      return callback(rediserror, true);
    }
    else {
      return callback(rediserror, false);
    }
  });
};

var server = new Hapi.Server();
server.connection({ host: 'localhost', port: 8888 });

server.register(require('hapi-auth-jwt2'), function (err) {
    if(err){
      console.log(err);
    }
    server.auth.strategy('jwt', 'jwt',
      { 
        key: 'NeverShareYourSecret',          // Never Share your secret key
        validateFunc: validate,            // validate function defined above
        verifyOptions: { ignoreExpiration: true, algorithms: [ 'HS256' ] } // pick a strong algorithm
      }
    );

    server.auth.default('jwt');

    server.register({
      register: require('hapi-router'),
      options: {
          routes: 'resources/**/route.js'
      }
    }, function (err) {
      if (err) throw err;
    });
});
if(require.main === module) {
  server.start(function () {
    console.log('Server running at:', server.info.uri);
  });  
} else {
  module.exports = server
}