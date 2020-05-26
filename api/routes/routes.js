'use strict';
module.exports = function(app) {
    var controller = require('../controllers/controller');

    // persist a document
    app.route('/create').post(controller.create);

    // retrieve a document by id
    app.route('/read/:address/:id').get(controller.read);

}