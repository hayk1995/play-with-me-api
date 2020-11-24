const {HttpError} = require("../validations/errors");
const {UserModel} = require("../models/user-model");

const {sign, verify} = require("./jwt-service")

async function createUser(req, res) {
    const data = req.body;
    const user = new UserModel(data);
    await user.save();

    res.json(user);
}

module.exports = {
    createUser
}
