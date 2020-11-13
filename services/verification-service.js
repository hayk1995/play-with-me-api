const config = require("config");
const twilio = require('twilio');
const {HttpError} = require("../validations/errors");

const client = new twilio(config.get("twilio.accountSid"),config.get("twilio.authToken"));

function startVerification(phone) {
    return client.verify.services(config.get("twilio.verifySid"))
        .verifications
        .create({to: phone, channel: 'sms'});
}

async function checkVerification(phone, code) {
    const verifyResult = await client.verify.services(config.get("twilio.verifySid"))
        .verificationChecks
        .create({to: phone, code: code});

    if(verifyResult.status !== "approved") {
        throw new HttpError("Verification code is wrong", 400);
    }
}


module.exports = {
    startVerification,
    checkVerification
}

