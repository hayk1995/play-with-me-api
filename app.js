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


// ------------ Load Routers ------------ //
const userRouter = require('./routes/user-router');


// ---------- Connect Routers ---------- //
app.use("/users", userRouter);

// ------------ Error Handler ------------ //
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json(err);
});

module.exports = app;
