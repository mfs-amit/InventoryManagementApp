const productModel = require("../models/product");

function findProductByName(name) {
    return productModel.findOne({ name: name });
};

let productJSON = (params) => {
    return {
        name: params.name,
        mrp: params.mrp,
        price: params.price,
        rating: params.rating,
        image: params.image,
        description: params.description,
        distributor: params.distributor,
        attribute: params.attribute
    };
}

module.exports.addProduct = async function (params) {
    try {
        const product = await findProductByName(params.name);
        if (product) throw `'${params.name}' already exist!`;
        return await new productModel(await productJSON(params)).save();
    } catch (err) {
        throw err;
    }
};

module.exports.calculateAverageRating = async function (productDetail) {
    let totalRating = 0;
    for (let obj of productDetail.rating) {
        totalRating = totalRating + await asyncOperation(obj.rating);
    }
    var productDetailWithAverageRating = productDetail.toObject();
    productDetailWithAverageRating["averageRating"] = Math.round(totalRating / productDetail.rating.length || 0);
    return productDetailWithAverageRating;
}

function asyncOperation(val) {
    return new Promise((resolve, reject) => {
        resolve(val);
    });
}

module.exports.updateProduct = async function (params) {
    try {
        const product = await findProductByName(params.name);
        if (product && product._id != params._id) throw `'${params.name}' already exist!`;
        productModel.updateOne({ _id: params._id }, { $set: await productJSON(params) }).then(result => {
            return { message: 'Product updated successfully.' };
        }).catch(error => {
            throw 'Product not found!';
        })
    } catch (err) {
        throw err;
    }
};

module.exports.productJSON = productJSON;