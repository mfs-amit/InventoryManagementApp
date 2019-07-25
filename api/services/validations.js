const joi = require("@hapi/joi");

const registerValidation = (data) => {
    const schema = {
        username: joi.string().min(4).required(),
        password: joi.string().min(4).required(),
        userType: joi.string().required()
    }
    return joi.validate(data, schema);
}

const loginValidation = (data) => {
    const schema = {
        username: joi.string().min(4).required(),
        password: joi.string().min(4).required()
    }
    return joi.validate(data, schema);
}

const productValidation = (data) => {
    const schema = {
        name: joi.string().min(2).required(),
        price: joi.number().required(),
        rating: joi.number().required(),
        quantity: joi.number().required(),
        image: joi.string().allow(null, '').optional(),
        description: joi.string().allow(null, '').optional(),
        distributor: joi.string().min(2).required()
    }
    return joi.validate(data, schema);
}

const updateProductValidation = (data) => {
    const schema = {
        name: joi.string().min(2).required(),
        price: joi.number().required(),
        rating: joi.number().required(),
        quantity: joi.number().required(),
        image: joi.string().allow(null, '').optional(),
        description: joi.string().allow(null, '').optional(),
        distributor: joi.string().min(2).required(),
        _id: joi.string().required()
    }
    return joi.validate(data, schema);
}

const distributorValidation = (data) => {
    const schema = {
        name: joi.string().min(2).required(),
        email: joi.string().required(),
        phone: joi.number().required(),
        address: joi.string().required(),
        image: joi.string().allow(null, '').optional()
    }
    return joi.validate(data, schema);
}

const updateDistributorValidation = (data) => {
    const schema = {
        name: joi.string().min(2).required(),
        email: joi.string().required(),
        phone: joi.number().required(),
        address: joi.string().required(),
        image: joi.string().allow(null, '').optional(),
        _id: joi.string().required()
    }
    return joi.validate(data, schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.productValidation = productValidation;
module.exports.updateProductValidation = updateProductValidation;
module.exports.distributorValidation = distributorValidation;
module.exports.updateDistributorValidation = updateDistributorValidation;