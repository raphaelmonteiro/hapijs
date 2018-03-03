'use strict'

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const { expect } = require('code')
const server = require('../')
const TesteHandler = require('../resources/testes/handlers/testeHandler')

lab.describe('teste deve testar o testes', () => {
    lab.test('teste deve funcionar', () => {
        expect(true).to.be.true();
    })

    lab.test('testar o cadastro de testes.', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/teste'
        })
        expect(res.statusCode).to.equal(200)
        expect(res.result).to.equal({text: 'You used a Token!'})
    })
})