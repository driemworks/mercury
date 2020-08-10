var express = require('express'),
    app = express(),
    cors = require('cors'),
    port = process.env.PORT || 4000,
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken');

// middleware logger
const logger = require('./middleware/logging');
var accessTokenSecret = 'supersecretaccesstoken';
var jwtFeatureFlag = false;

// authentication middleware
var authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader)  {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

// **************************************88
// HERE I AM! REINSTALL ME MAYBE?
// "eth-lightwallet": "^4.0.0",

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(logger);
app.set('trust-proxy', 1);
app.use(session({
    secret: 'Test Secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

if (jwtFeatureFlag === true) {
    app.use(authenticateJWT);
}
// TODO security considerations
// https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/
app.use(cors());

var routes = require('./api/routes/routes');
routes(app);


app.listen(port, async () => {
    console.log('Mercury listening on port ' + port);
    var DBService = require('../database');
    await DBService.init();
    console.log('Initialized database');
});