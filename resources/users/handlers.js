'use strict'

const UsersModel = require('./models/users');
const Boom = require('boom');

module.exports = {
    create(req, reply) {
        UsersModel.create({
            name: req.payload.name,
            email: req.payload.email,
            last_name: req.payload.last_name,
            password: req.payload.password,
            active: true,
            hole: 'admin',
        }, (err, user) => {
            if(err) {
                return reply( Boom.badData('Error'))
            }
            reply.response(user)
        })
    }
}