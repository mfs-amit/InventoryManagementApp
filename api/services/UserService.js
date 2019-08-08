const userModel = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nconf = require('nconf');
nconf.file({ file: '.config/config.json' });

function findUserByName(username) {
    return userModel.findOne({ username: username });
};

async function createHashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
};

registerUser = async function (params) {
    try {
        const user = await findUserByName(params.username);
        if (user) throw 'User exists';
        let userData = new userModel({
            username: params.username,
            password: await createHashPassword(params.password),
            userType: params.userType
        });
        return await userData.save();
    } catch (err) {
        throw err;
    }
};

module.exports.registerAdmin = async function () {
    try {
        var adminData = {
            "username": "Admin" + Math.floor(1000 + Math.random() * 9000),
            "password": "pass" + Math.floor(10000 + Math.random() * 90000),
            "userType": "admin"
        }
        return { adminRegistered: await registerUser(adminData) ? true : false, adminData: adminData };
    } catch (err) {
        throw err;
    }
};

module.exports.loginUser = async function (params) {
    try {
        const user = await findUserByName(params.username);
        if (!user) throw 'User is not Registered!';
        const validPassword = await bcrypt.compare(params.password, user.password);
        if (!validPassword) throw "Invalid credentials!";
        const token = jwt.sign({ _id: user._id }, nconf.get('SECRET_KEY'));
        return { message: "Logged in successfully", username: user.username, userType: user.userType, token: token, _id: user._id };
    } catch (err) {
        throw err;
    }
};

module.exports.registerUser = registerUser;