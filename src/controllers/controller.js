'use strict';
const DatabaseService = require('../service/database');
const EthService = require('../service/eth.service');
const jwt = require('jsonwebtoken');

exports.query = async (req, res) => {
    console.log('TO BE IMPLEMENTED');
    res.json('Not yet implemented');
}

/*
    Update an existing resource if it exists
    Create a resource if it does not exist
*/
exports.addEvent = async (req, res) => {
    const address =  req.params.address;
    const event = req.body;
    await DatabaseService.addEvent(address, event);
    res.sendStatus(204);
}

exports.retrieveEvent = async (req, res) => {
    const events = await DatabaseService.retrieveEvents(req.params.address, req.params.limit);
    res.send(events);
}

// maybe should add yup: request body validation
exports.login = async (req, res) => {
    try {
        const isAddressVerified = EthService.verifyAddress(
            req.params.address, req.body.message,
            req.body.v, req.body.r, req.body.s
        );
        if (isAddressVerified === true) {
            // jwt token that expires in 24 hours
            const accessToken = jwt.sign({ address: req.params.address }, 
                'supersecretaccesstoken', { expiresIn: '1d' });
            res.json({ accessToken }); 
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        console.error(err);
        res.status(400).send();
    }
}