require('dotenv').config();

module.exports = {
    db: {
        uri: "mongodb://localhost:27017/play-with-me"
    },
    server: {
        port: 8080
    },
    admin: {
        user: process.env,
        pwd: process.env

    },
    mail: {
        user: process.env.MAIL_USER,
        pwd: process.env.MAIL_PWD
    }
}