const express = require('express');

const AccountRouter = require('./accountsRouter/AccountRouter')

const server = express();

server.use(express.json());

server.use('/accounts', AccountRouter)

server.get('/', (req, res) => {
    res.status(200).json({ sanity: 'check' })
});

module.exports = server;