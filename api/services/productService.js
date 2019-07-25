const productModel = require("../models/product");

function findProductByName(name) {
    return productModel.findOne({ name: name });
};

let productJSON = async function (params) {
    return {
        name: params.name,
        price: params.price,
        rating: params.rating,
        quantity: params.quantity,
        image: params.image,
        description: params.description,
        distributor: params.distributor
    };
}

module.exports.addProduct = async function (params) {
    try {
        const product = await findProductByName(params.name);
        if (product) throw `'${params.name}' already exist!`;
        const savedProduct = await new productModel(await productJSON(params)).save();
        if (savedProduct) return savedProduct;
    } catch (err) {
        throw err;
    }
};

module.exports.updateProduct = async function (params) {
    try {
        const product = await findProductByName(params.name);
        if (product && product.name != params.name) throw `'${params.name}' already exist!`;
        productModel.updateOne({ _id: params._id }, { $set: await productJSON(params) }, (err, result) => {
            if (result) {
                return { message: 'Product updated successfully.' };
            } else {
                throw 'Product not found!';
            }
        });
    } catch (err) {
        throw err;
    }
};

module.exports.productJSON = productJSON;