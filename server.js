// external dependencies
var express = require('express'),
    app = express(),
    cors = require('cors'),
    port = process.env.PORT || 4000,
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
// TODO security considerations
// https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/
app.use(cors());

var routes = require('./src/routes/routes');
routes(app);
app.listen(port, async () => {
    var DBService = require('./src/service/database');
    await DBService.init();
    console.log('Mercury listening on port ' + port);
});