const router = require("express").Router();
const productModel = require("../models/product");
const verify = require("../middlewares/verifyToken");
const imageUpload = require("../middlewares/imageUpload");
const { productValidation, updateProductValidation } = require("../services/validations");
const { addProduct, updateProduct, calculateAverageRating } = require("../services/productService");
const config = require('config');
const KEYS = config.get('KEYS');

/************************** API to add product *******************************************************/
router.post("/", verify, async (request, response) => {
    const { error } = productValidation(request.body);
    if (error) return response.status(400).send(error.details[0].message);
    try {
        const savedProduct = await addProduct(request.body);
        response.send({ message: "Product added successfully.", data: savedProduct });
    } catch (error) {
        response.status(500).send(error);
    }
});

/**********************************API to get all products *********************************************/
router.get('/', verify, async (request, response) => {
    try {
        let productList = await productModel.find();
        response.send(productList);
    } catch (error) {
        response.status(500).send(error);
    }
});

/***********************************API to get product by id ********************************************/
router.get('/:id', verify, async (request, response) => {
    try {
        productModel.findById(request.params.id).then(result => {
            calculateAverageRating(result).then(productDetailWithAverageRating => {
                response.send(productDetailWithAverageRating);
            }).catch(error => {
                response.status(500).send(error);
            })
        }).catch(error => {
            response.status(400).send('Product not found!');
        })
    } catch (error) {
        response.status(500).send(error);
    }
});

/************************************API to delete product by id *************************************/
router.delete('/:id', verify, async (request, response) => {
    try {
        productModel.findByIdAndDelete(request.params.id).then(result => {
            response.send({ messgae: 'Product deleted successfully.' });
        }).catch(error => {
            response.status(400).send('Product not found!');
        })
    } catch (error) {
        response.status(500).send(error);
    }
});

/*************************************API to update product **********************************************/
router.put('/', verify, async (request, response) => {
    const { error } = updateProductValidation(request.body);
    if (error) return response.status(400).send(error.details[0].message);
    try {
        const updatedProduct = await updateProduct(request.body);
        response.send(updatedProduct);
    } catch (error) {
        response.status(500).send(error);
    }
});

/************************************** Upload image *****************************************************/
router.post('/upload', verify, imageUpload, (request, response) => {
    if (request.file) {
        response.json({ imageUrl: `http://localhost:${KEYS.PORT || 3001}/images/uploads/${request.file.filename}` });
    }
    else {
        response.status("409").json("No Files to Upload.");
    }
});

module.exports = router;