const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./config/routes");
const logger = require("./config/logger");
const config = require('config');
const { registerAdmin } = require("./api/services/UserService");
const DB_CONFIG = config.get('DB_CONFIG');

const app = express();
const port = DB_CONFIG.PORT || 3001;

/******************************* connection to mongoDB ********************************/
mongoose.connect(DB_CONFIG.DB_CONNECT, { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
    console.log('Connected to mongoDB');
    app.listen(port, async () => {
        console.log("server started at port", port);
        try {
            const registerResponse = await registerAdmin();
            console.log(registerResponse.adminRegistered ? 'Welcome Admin!\nUsername : ' + registerResponse.adminData.username + "\nPassword : " + registerResponse.adminData.password : 'Something Went Wrong');
        } catch (errors) {
            console.log(errors)
        }
    })
});

mongoose.connection.on("error", (err) => {
    console.log("Error in mongoDB connection!");
});

/********************************** adding middleware ***********************************/
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(logger);
app.use("/api", routes);

/********************************** Testing NodeJS App **********************************/
app.get("/", (req, res) => {
    res.send('Testing');
})