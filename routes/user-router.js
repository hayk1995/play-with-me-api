const express = require('express');
const router = express.Router();

const {registerUser,verifyUser, passwordResetPhone, passwordReset, passwordResetEmail} = require("../services/user-service");
const {regSchema, verifyUserSchema, passwordResetSchema, passwordResetEmailSchema, passwordResetPhoneSchema} = require("../validations/user-validation");
const {bodyValidator} = require("../validations/helpers");

router.post("/", bodyValidator(regSchema), registerUser);
router.post("/verify", bodyValidator(verifyUserSchema),  verifyUser);
router.post("/password/reset/phone", bodyValidator(passwordResetPhoneSchema), passwordResetPhone);
router.post("/password/reset/email", bodyValidator(passwordResetEmailSchema),passwordResetEmail);
router.post("/password/reset", bodyValidator(passwordResetSchema), passwordReset);

module.exports = router;
