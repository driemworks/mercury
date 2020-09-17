'use strict';
const DatabaseService = require('../service/database');
const EthService = require('../service/eth.service');
const jwt = require('jsonwebtoken');

/*
    Read a resource by id (filename)
*/
exports.read = async (req, res) => {
    const dbResponse = await DatabaseService.get(req.params.address, req.params.id);
    res.json(dbResponse);
}

exports.query = async (req, res) => {
    console.log('TO BE IMPLEMENTED');
    res.json('Not yet implemented');
}

/*
    Update an existing resource if it exists
    Create a resource if it does not exist
*/
exports.upload = async (req, res) => {
    const address =  req.params.address;
    const id = req.params.id;
    const json = req.body;
    await DatabaseService.update(address, id, json);
    res.sendStatus(204);
}

// maybe should add yup: request body validation
exports.login = async (req, res) => {
    try {
        const isAddressVerified = EthService.verifyAddress(
            req.params.address, req.body.msg, 
            req.body.v, req.body.r, req.body.s
        );

        console.log(isAddressVerified);

        if (isAddressVerified === true) {
            // jwt token that expires in 24 hours
            const accessToken = jwt.sign({ address: req.params.address }, 
                'supersecretaccesstoken', { expiresIn: '1d' });
            console.log('**** ' + accessToken);
            res.json({ accessToken }); 
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        console.log(err);
        // res.status(400).send(err.toString());
    }
}