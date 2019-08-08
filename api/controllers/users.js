const router = require("express").Router();
const { registerValidation, loginValidation } = require("../services/validations");
const { registerUser, loginUser } = require("../services/UserService");

router.post("/register", async (request, response) => {
    const { error } = registerValidation(request.body);
    if (error) return response.status(400).send(error.details[0].message);
    try {
        const registerResponse = await registerUser(request.body);
        response.send(registerResponse);
    } catch (errors) {
        response.status(500).send(errors);
    }
});

router.post("/login", async (request, response) => {
    const { error } = loginValidation(request.body);
    if (error) return response.status(400).send(error.details[0].message);
    try {
        const loginResponse = await loginUser(request.body);
        response.send(loginResponse);
    } catch (errors) {
        response.status(500).send(errors);
    }
});

module.exports = router;