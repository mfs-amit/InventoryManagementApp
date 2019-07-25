const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send("Access Denied");
    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (errors) {
        res.status(401).send('Invalid Token');
    }
}