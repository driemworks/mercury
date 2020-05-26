'use strict';
// const { check, validationResult } = require('express-validator');
const DatabaseService = require('../../database');

exports.create = async (req, res) => {
    await DatabaseService.put(req.body.id, req.body.address, req.body.document);
    res.status(204);
    res.json('');
}

exports.read = async (req, res) => {
    const dbResponse = await DatabaseService.get(req.params.address, req.params.id);
    res.json(dbResponse);
}