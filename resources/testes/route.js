'use strict'
const Joi = require('joi');
const TesteHandler = require('./handlers/testeHandler')
console.log('route teste')
module.exports = [
    {
        method: 'GET', 
        path: '/teste', 
        config: { auth: false },
        handler: function(request, reply) {
            reply({text: 'You used a Token!'});
        }
    },
    {
        method: 'POST', 
        path: '/teste/create', 
        config: { 
            auth: false,
            validate: {
                payload: Joi.object({
                    title: Joi.string().min(3).max(6).required(),
                    qty: Joi.number().required(),
                    price: Joi.number().required(),
                })
            }
        },
        handler: TesteHandler.create,
    },
    {
        method: 'GET', 
        path: '/teste/find', 
        config: { 
            auth: false
        },
        handler: TesteHandler.find
    },
    {
        method: 'GET', 
        path: '/teste/findby/{id}', 
        config: { 
            auth: 'jwt',
            validate: {
                params: {
                    id: Joi.string().required(),
                }
            }
        },
        handler: TesteHandler.findBy
    }
]