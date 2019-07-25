const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

/******************************** Environment setup **********************************/
const dotEnv = require("dotenv");

dotEnv.config();

/*********************************Initiallize App *************************************/
var app = express();

const users = require("./api/controllers/users");
const products = require("./api/controllers/products");
const distributors = require("./api/controllers/distributors");

/******************************* connection to mongoDB ********************************/
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
    console.log('Connected to mongoDB')
});

mongoose.connection.on("error", (err) => {
    console.log("Error in connection!")
});

/********************************** adding middleware ***********************************/
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/distributors", distributors);

/************************************* Port Number **************************************/
const port = process.env.PORT || 3001;

/********************************** Testing NodeJS App **********************************/
app.get("/", (req, res) => {
    res.send('Testing');
})

app.listen(port, () => {
    console.log("server started at port", port);
})