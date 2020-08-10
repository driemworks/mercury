const logger = function(req, res, next) {
    console.log('received request at ' + new Date());
    next();
};

module.exports.logger = logger;