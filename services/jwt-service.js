const jwt = require('jsonwebtoken');
const key = "shhhhh";

function sign(data, headers = {}) {
    return jwt.sign(data, key, headers);
}

function verify(token) {
    return jwt.verify(token, key);
}

module.exports = {
    sign,
    verify
}