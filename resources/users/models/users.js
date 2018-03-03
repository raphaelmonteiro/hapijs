'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TesteSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    hole: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        require: true
    }
})

module.exports = mongoose.model('Teste', TesteSchema)