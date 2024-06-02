const mongoose = require('mongoose');
require('../models/Movie');
require('../models/Cast');

const connectionString = 'mongodb://0.0.0.0:27017/movie-magics';

async function configDatabase() {
    await mongoose.connect(connectionString);
    console.log('Database connected!');
}

module.exports = { configDatabase };