const express = require('express');
require('express-async-errors');

const app = express();

const bodyParser = require('body-parser');

// ---------- Connect Middlewares ---------- //
app.use(bodyParser.json());


// ------------ Load Libraries ----------- //
const mongooseConnect = require('./libs/mongoose-connect');
// const authorize = require('./libs/authorization');

// ---------- Mongoose connect ---------- //
mongooseConnect();

//swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Customer API",
            description: "Customer API Information",
            contact: {
                name: "Amazing Developer"
            },
            servers: ["http://localhost:8080"]
        }
    },
    // ['.routes/*.js']
    apis: ["routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// ---------- Connect Routers ---------- //
require('./routes/user-router')(app);

// ------------ Error Handler ------------ //
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json(err);
});



module.exports = app;
