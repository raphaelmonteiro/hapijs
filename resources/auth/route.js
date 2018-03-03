'use strict'
const Joi = require('joi');
var JWT = require('jsonwebtoken');
var redisClient = require('redis-connection')();

console.log('route auth')
module.exports = [
    {
        method: "GET", 
        path: "/", 
        config: { auth: false },
        handler: function(request, reply) { reply({text: 'Token not required'}) }
    },
    {
        method: 'GET', 
        path: '/restricted', 
        config: { auth: 'jwt' },
        handler: function(request, reply) {
            reply({text: 'You used a Token!'})
        }
    },
    {
        method: ['GET','POST'], path: "/auth", config: { auth: false },
        handler: function(request, reply) {
            var session = {
                valid: true,
                id: 'hu5ihui4hi3hu3dsai',
                exp: new Date().getTime() + 30 * 60 * 1000
            }
            redisClient.set(session.id, JSON.stringify(session));
            var token = JWT.sign(session, 'NeverShareYourSecret');
            console.log(token);

            reply({text: 'Check Auth Header for your Token'})
            .header("Authorization", token);
        }
    },
    {
        method: ['GET','POST'], path: "/logout", config: { auth: 'jwt' },
        handler: function(request, reply) {
          var decoded = JWT.decode(request.headers.authorization,
            'NeverShareYourSecret');
          var session;
          redisClient.get(decoded.id, function(rediserror, redisreply) {
            if(rediserror) {
              console.log(rediserror);
            }
            session = JSON.parse(redisreply)
            session.valid = false;
            session.ended = new Date().getTime();
            redisClient.set(session.id, JSON.stringify(session));
            reply({text: 'You have been logged out!'})
          })
        }
      },
]