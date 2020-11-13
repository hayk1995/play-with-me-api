const {HttpError} = require("./errors");

function bodyValidator(schema) {
    return function (req, res, next) {
        const {error} = schema.validate(req.body);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const {details} = error;
            const message = details.map(i => i.message).join(',');

            throw new HttpError(message, 400, details);
        }
    }
}

module.exports = {
    bodyValidator
}
