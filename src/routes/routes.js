'use strict';
var authenticateJWT = require('../middleware/authenticateJWT');
module.exports = function(app) {
    var controller = require('../controllers/controller');
    // retrieve a document by filename (id)
    app.route('/read/:address/:id').get(authenticateJWT, controller.read);
    // retrieve all doc ids in the user's docstore
    app.route('/query/:address').get(authenticateJWT, controller.query);
    // update a (json) document by filename (id)
    app.route('/upload/:address/:id').post(authenticateJWT, controller.upload);
    // login/authenticate
    app.route('/login/:address').post(controller.login);
}