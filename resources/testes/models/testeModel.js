'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TesteSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    qty: {
        type: Number
    },
    price: {
        type: Number
    }
})

module.exports = mongoose.model('Teste', TesteSchema)