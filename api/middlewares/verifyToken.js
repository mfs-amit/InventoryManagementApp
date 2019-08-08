const jwt = require("jsonwebtoken");
const config = require('config');
const KEYS = config.get('KEYS');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send("Access Denied");
    try {
        const decodedToken = jwt.verify(token, KEYS.SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (errors) {
        res.status(401).send('Access Denied');
    }
}