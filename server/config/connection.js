const mongoose = require('mongoose');

mongoose.set('strictQuery', false); // Suppress Mongoose deprecation warning

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/venueDB');

module.exports = mongoose.connection;
