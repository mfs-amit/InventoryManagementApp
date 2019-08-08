const distributorModel = require("../models/distributor");

function findDistributorByEmail(email) {
    return distributorModel.findOne({ email: email });
};

let distributorJSON = (params) => {
    return {
        name: params.name,
        email: params.email,
        phone: params.phone,
        address: params.address,
        image: params.image
    };
}

module.exports.addDistributor = async function (params) {
    try {
        const distributor = await findDistributorByEmail(params.email);
        if (distributor) throw `'${params.email}' already exist!`;
        return await new distributorModel(await distributorJSON(params)).save();
    } catch (err) {
        throw err;
    }
};

module.exports.updateDistributor = async function (params) {
    try {
        const distributor = await findDistributorByEmail(params.email);
        if (distributor && distributor._id != params._id) throw `'${params.email}' already exist!`;
        distributorModel.updateOne({ _id: params._id }, { $set: await distributorJSON(params) }).then(result => {
            return { message: 'Distributor updated successfully.' };
        }).catch(error => {
            throw 'Distributor not found!';
        })
    } catch (err) {
        throw err;
    }
};

module.exports.distributorJSON = distributorJSON;