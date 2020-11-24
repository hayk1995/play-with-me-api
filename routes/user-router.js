const {createUser} = require("../services/user-service");
const {signUpSchema} = require("../validations/user-validation");
const {bodyValidator} = require("../validations/helpers");


module.exports = function(app) {
    // Routes
    /**
     * @swagger
     * /users/sign-up:
     *  post:
     *    description: Use to sign up
     *    consumes:
     *      - application/json
     *    parameters:
     *      - in: body
     *        name: user
     *        description: the user to create
     *        schema:
     *          type: object
     *          properties:
     *            email:
     *              type: string
     *            password:
     *              type: string
     *
     *    responses:
     *      '200':
     *        description: A successful response
     */
    app.post("/sign-up", bodyValidator(signUpSchema), createUser);
}
