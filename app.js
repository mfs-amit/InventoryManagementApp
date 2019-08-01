const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotEnv = require("dotenv");
const routes = require("./config/routes");

const app = express();
const port = process.env.PORT || 3001;

dotEnv.config();

/******************************* connection to mongoDB ********************************/
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true });
mongoose.connection.on("connected", () => {
    console.log('Connected to mongoDB')
});

mongoose.connection.on("error", (err) => {
    console.log("Error in connection!")
});

/********************************** adding middleware ***********************************/
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use("/api", routes);

/********************************** Testing NodeJS App **********************************/
app.get("/", (req, res) => {
    res.send('Testing');
})

app.listen(port, () => {
    console.log("server started at port", port);
})