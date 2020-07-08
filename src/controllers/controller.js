'use strict';

const DatabaseService = require('../service/database');
const EthereumService = require('../service/eth.service');
const EthService = require('../service/eth.service');

/*
    Read a resource by id (filename)
*/
exports.read = async (req, res) => {
    const dbResponse = await DatabaseService.get(req.params.address, req.params.id);
    res.json(dbResponse);
}

/*
    Update an existing resource if it exists
    Create a resource if it does not exist
*/
exports.update = async (req, res) => {
    console.log(req.user.address);
    console.log(req.params.address);
    if (req.user.address !== req.params.address) {
        res.sendStatus(403);
    } else {
        const address =  req.params.address;
        const id = req.params.id;
        const json = req.body;
        await DatabaseService.update(address, id, json);
        res.sendStatus(204);
    }
}

exports.login = async (req, res) => {
    EthService.recoverEthereumAccount(req.body.password, req.body.mnemonic);
    res.json("test");
}