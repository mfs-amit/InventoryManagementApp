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
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    distributor: {
        type: Array,
        required: false
    },
    attribute: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model("product", productSchema);