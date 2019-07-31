const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Array
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    distributor: {
        type: Array
    },
    attribute: {
        type: Array
    }
});

module.exports = mongoose.model("product", productSchema);