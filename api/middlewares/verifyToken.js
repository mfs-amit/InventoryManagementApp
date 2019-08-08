const jwt = require("jsonwebtoken");
var nconf = require('nconf');
nconf.file({ file: '.config/config.json' });

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send("Access Denied");
    try {
        const decodedToken = jwt.verify(token, nconf.get('SECRET_KEY'));
        req.user = decodedToken;
        next();
    } catch (errors) {
        res.status(401).send('Access Denied');
    }
}