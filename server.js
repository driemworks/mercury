var express = require('express'),
    app = express(),
    cors = require('cors'),
    port = process.env.PORT || 4000,
    bodyParser = require('body-parser');

// middleware logger
var logger = function(req, res, next) {
    // console.log(req);
    console.log('received request at ' + new Date());
    next();
}

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(logger);
// TODO security considerations
// https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/
app.use(cors());

var routes = require('./api/routes/routes');
routes(app);

app.listen(port, async () => {
    console.log('Mercury listening on port ' + port);
    var DBService = require('./database');
    await DBService.init();
    console.log('Initialized database');
});