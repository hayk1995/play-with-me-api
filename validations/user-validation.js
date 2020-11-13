const Joi = require('joi');

const regSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(6).max(40)
});

const verifyUserSchema = Joi.object({
    phone: Joi.string().required(),
    code: Joi.string().required()
});

const passwordResetPhoneSchema = Joi.object({
    phone: Joi.string().required(),
});

const passwordResetEmailSchema = Joi.object({
    phone: Joi.string().required(),
    code: Joi.string().required()
});

const passwordResetSchema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required().min(6).max(40)
});

module.exports = {
    regSchema,
    verifyUserSchema,
    passwordResetPhoneSchema,
    passwordResetEmailSchema,
    passwordResetSchema
}
