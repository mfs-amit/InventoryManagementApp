const distributorModel = require("../models/distributor");

function findDistributorByEmail(email) {
    return distributorModel.findOne({ email: email });
};

let distributorJSON = async function (params) {
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
        const savedDistributor = await new distributorModel(await distributorJSON(params)).save();
        if (savedDistributor) return savedDistributor;
    } catch (err) {
        throw err;
    }
};

module.exports.updateDistributor = async function (params) {
    try {
        const distributor = await findDistributorByEmail(params.email);
        if (distributor && distributor.email != params.email) throw `'${params.email}' already exist!`;
        distributorModel.updateOne({ _id: params._id }, { $set: await distributorJSON(params) }, (err, result) => {
            if (result) {
                return { message: 'Distributor updated successfully.' };
            } else {
                throw 'Distributor not found!';
            }
        });
    } catch (err) {
        throw err;
    }
};

module.exports.distributorJSON = distributorJSON;