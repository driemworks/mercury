var jwt = require('jsonwebtoken');
var secret = 'supersecretaccesstoken';

var authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        console.log(authHeader);
        const token = authHeader;
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

module.exports = authenticateJWT;