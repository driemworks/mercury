'use strict';
module.exports = function(app) {
    var controller = require('../controllers/controller');
    // retrieve a document by filename (id)
    app.route('/read/:address/:id').get(controller.read);
    // update a (json) document by filename (id)
    app.route('/update/:address/:id').patch(controller.update);
}