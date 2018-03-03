'use strict'

const TesteModel = require('../models/testeModel')
const Boom = require('boom')

module.exports = {
    create(req, reply) {
        TesteModel.create({
            title: req.payload.title,
            qty: req.payload.qty,
            price: req.payload.price
        }, (err, product) => {
            if(err) {
                return reply( Boom.badData('Error'))
            }
            reply.response(product)
        })
    },
    find(req, reply) {
        TesteModel.find({}, (err, products) => {
            if(err) {
                return reply(Boom.notFound())
            }
            reply(products)
        })
    },
    findBy(req, reply) {
        TesteModel.findById(req.params.id, (err, product) => {
            if(err || product === null) {
                return reply(Boom.notFound())
            } 
            reply(product)
        })
    }
}