const userModel = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function findUserByName(username) {
    return userModel.findOne({ username: username });
};

async function createHashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
};

module.exports.registerUser = async function (params) {
    try {
        const user = await findUserByName(params.username);
        if (user) throw 'User exists';
        let userData = new userModel({
            username: params.username,
            password: await createHashPassword(params.password),
            userType: params.userType
        });
        const savedUser = await userData.save();
        if (savedUser) return savedUser;
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
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        return { message: "Logged in successfully", username: user.username, userType: user.userType, token: token };
    } catch (err) {
        throw err;
    }
};