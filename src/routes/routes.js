'use strict';
var authenticateJWT = require('../middleware/authenticateJWT');
module.exports = function(app) {
    var controller = require('../controllers/controller');
    // retrieve all doc ids in the user's docstore
    app.route('/:address/events/:limit').get(authenticateJWT, controller.retrieveEvent);
    // update a (json) document by filename (id)
    app.route('/:address/events').post(authenticateJWT, controller.addEvent);
    // login/authenticate
    app.route('/:address/login').post(controller.login);
}