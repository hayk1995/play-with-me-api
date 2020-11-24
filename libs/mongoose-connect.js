const mongoose = require('mongoose');

const appProperties = require("../app-properties");

module.exports = () => {
  const dbConfig = {
    autoIndex: false,
    useNewUrlParser: true
  };

  mongoose.connect(appProperties.db.uri, dbConfig);

  // Database connection Logs
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${appProperties.db.uri}`);
  });

  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });
};
