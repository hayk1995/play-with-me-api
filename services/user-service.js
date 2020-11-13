const {HttpError} = require("../validations/errors");
const {UserModel} = require("../models/user-model");
const {startVerification, checkVerification} = require("./verification-service");
const {sendEmail} = require("./mail-service");
const {sign, verify} = require("./jwt-service")

async function registerUser(req, res) {
    const data = req.body;
    const user = new UserModel(data);
    await user.save();
    await startVerification(data.phone);

    res.json(user);
}

async function verifyUser(req, res) {
    const data = req.body;

    await checkVerification(data.phone, data.code);

    const user = await UserModel.findOne({phone: data.phone});

    user.verified = true;
    user.save();

    res.send(user);
}

async function passwordResetPhone(req, res) {
    const data = req.body;

    await checkUserExistByPhone(data.phone);

    await startVerification(data.phone);

    res.send("ok");
}

async function passwordResetEmail(req, res) {
    const data = req.body;

    await checkUserExistByPhone(data.phone);

    await checkVerification(data.phone, data.code);

    const user = await UserModel.findOne({phone: data.phone});
    const token = sign({phone: user.phone});

    sendEmail("Password reset", token, user.email);

    res.send("ok");
}

async function passwordReset(req, res) {
    const data = req.body;

    const payload = verify(data.token);

    const user = await UserModel.findOne({phone: payload.phone});

    user.password = data.password;
    await user.save();

    res.send(user);
}

async function checkUserExistByPhone(phone) {
    const exists = await UserModel.exists({phone});
    if(!exists) {
        throw new HttpError("User not found", 404);
    }
}

module.exports = {
    registerUser,
    verifyUser,
    passwordResetPhone,
    passwordResetEmail,
    passwordReset
}
