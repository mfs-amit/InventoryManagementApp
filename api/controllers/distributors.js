const router = require('express').Router();
const distributorModel = require("../models/distributor");
const verify = require("../middlewares/verifyToken");
const { addDistributor, updateDistributor } = require("../services/distributorervice");
const { distributorValidation, updateDistributorValidation } = require("../services/validations");

/************************** API to add distributor *******************************************************/
router.post("/", verify, async (request, response) => {
    const { error } = distributorValidation(request.body);
    if (error) return response.status(400).send(error.details[0].message);
    try {
        const savedDistributor = await addDistributor(request.body);
        response.send({ message: "Distributor added successfully.", data: savedDistributor });
    } catch (error) {
        response.status(400).send(error);
    }
});

/**********************************API to get all distributors *********************************************/
router.get('/', verify, async (request, response) => {
    try {
        let distributorList = await distributorModel.find();
        response.send(distributorList);
    } catch (error) {
        response.status(400).send("Something went wrong!");
    }
});

/***********************************API to get distributor by id ********************************************/
router.get('/:id', verify, async (request, response) => {
    try {
        distributorModel.findById(request.params.id, (err, result) => {
            if (result) {
                response.send(result);
            } else {
                response.status(400).send('Distributor not found!');
            }
        });
    } catch (error) {
        response.status(400).send("Something went wrong!");
    }
});

/************************************API to delete distributor by id *************************************/
router.delete('/:id', verify, async (request, response) => {
    try {
        distributorModel.findByIdAndDelete(request.params.id, (err, result) => {
            if (result) {
                response.send({ messgae: 'Distributor deleted successfully.' });
            } else {
                response.status(400).send('Distributor not found!');
            }
        });
    } catch (error) {
        response.status(400).send("Something went wrong!");
    }
});

/*************************************API to update distributor **********************************************/
router.put('/', verify, async (request, response) => {
    const { error } = updateDistributorValidation(request.body);
    if (error) return response.status(400).send(error.details[0].message);
    try {
        const updatedDistributor = await updateDistributor(request.body);
        response.send(updatedDistributor);
    } catch (error) {
        response.status(400).send(error);
    }
});

module.exports = router;