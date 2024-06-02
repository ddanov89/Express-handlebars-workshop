const { Movie } = require('../models/Movie');

async function getAllMovies() {
    const movies = await Movie.find().lean();
    return movies;
}

async function getMovieById(id) {

    const movie = await Movie.findById(id).lean();
    return movie;
}

async function createMovie(movieData) {

    const movie = new Movie({
        title: movieData.title,
        genre: movieData.genre,
        director: movieData.director,
        year: Number(movieData.year),
        rating: Number(movieData.rating),
        description: movieData.description,
        imageURL: movieData.imageURL,
        cast: []
    });

    await movie.save();
    return movie;
}


async function searchMovie({ title, genre, year }) {
    const movies = await readFile();

    if (!title && !genre && !year) {
        return movies.map(movieModal);
    }

    const found = movies.filter((m) => {
        if (title && !m.title.toLowerCase().includes(title.toLowerCase())) {
            return false;
        }
        if (genre && !m.genre.toLowerCase() != (genre.toLowerCase())) {
            return false;
        }
        if (year && !m.year != year) {
            return false;
        }
        return true;
    });
    return found;
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    searchMovie
};