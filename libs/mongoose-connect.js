const mongoose = require('mongoose');
const config = require('config');

module.exports = () => {
  const dbConfig = {
    autoIndex: false,
    useNewUrlParser: true
  };

  mongoose.connect(config.get('db.db'), dbConfig);

  // Database connection Logs
  mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${config.get('db.db')}`);
  });

  mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
  });
};
