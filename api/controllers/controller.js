'use strict';
// const { check, validationResult } = require('express-validator');
const DatabaseService = require('../../database');

/*
    Read a resource by id (filename)
*/
exports.read = async (req, res) => {
    const dbResponse = await DatabaseService.get(req.params.address, req.params.id);
    res.json(dbResponse);
}

/*
    Update an existing resource
    /update/<address>/<filename>
*/
exports.update = async (req, res) => {
    const address =  req.params.address;
    const id = req.params.id;
    const json = req.body;
    await DatabaseService.update(address, id, json);
    res.status(204);
    res.json('');
}