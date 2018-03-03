'use strict'
const Joi = require('joi');
const Handlers = require('./handlers')
console.log('route user')
module.exports = [
    {
        method: 'POST', 
        path: '/users/create', 
        config: { 
            auth: false,
            validate: {
                payload: Joi.object({
                    name: Joi.string().min(3).max(20).required(),
                    last_name: Joi.string().min(3).max(20).required(),
                    email: Joi.email().required(),
                    password: Joi.string().min(6).required(),
                }),
            },
            response: {
                schema: Joi.object({
                    name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    email: Joi.email().required(),
                    active: Joi.boolean().required(),
                    password: Joi.forbidden(),
                    hole: Joi.forbidden(),
                })
            }
        },
        handler: Handlers.create
    },
]