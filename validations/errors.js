class HttpError extends Error {
    constructor(message, status, details) {
        super(message);

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);

        this.status = status;

        this.details = details;
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            details: this.details,
            stackTrace: this.stack
        }
    }
}

module.exports = {
    HttpError
}
