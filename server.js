var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

// middleware logger
var logger = function(req, res, next) {
    console.log('LOGGED');
    next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);

var routes = require('./api/routes/routes');
routes(app);

app.listen(port, async () => {
    console.log('Mercury listening on port ' + port);
    var DBService = require('./database');
    await DBService.init();
    console.log('Initialized database');
});