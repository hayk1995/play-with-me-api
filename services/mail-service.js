const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const config = require("config");

const transporter = nodemailer.createTransport(smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: config.get("mail.user"),
        pass: config.get("mail.pwd")
    }
}));

function sendEmail(subject, txt, email) {
    return transporter.sendMail({
        from: config.get("mail.user"),
        to: email,
        subject: subject,
        text: txt
    });
}

module.exports = {
    sendEmail
};