const mongoose = require("mongoose");

const distributorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image : {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("distributor", distributorSchema);