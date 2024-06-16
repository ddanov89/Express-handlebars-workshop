const mongoose = require('mongoose');
require('../models/Movie');
require('../models/Cast');
require('../models/User');
// const { Movie } = require('../models/Movie');
// const { User } = require('../models/User');


const connectionString = 'mongodb://0.0.0.0:27017/movie-magics';

async function configDatabase() {

    await mongoose.connect(connectionString);
    // await migrateMovies();

    console.log('Database connected!');
}

module.exports = { configDatabase };

// async function migrateMovies() {
//     //migrating movie dataBase
//     const firstUser = await User.findOne();

//     await Movie.updateMany({}, { $set: { author: firstUser._id } });
// }