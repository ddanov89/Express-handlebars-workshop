const { query } = require("express");
const { getAllMovies, getMovieById } = require("../services/movie");

module.exports = {
    home: async (req, res) => {
        const movies = await getAllMovies();
        res.render('home', { movies });
    },
    details: async (req, res) => {
        const { id } = req.params;
        const movie = await getMovieById(id);
        if (!movie) {
            res.render('404');
            return;
        }
        movie.startRating = "&#x2605;".repeat(movie.rating);
        res.render('details', { movie });
    },
    // search: async (req, res) => {
    //     const movies = await searchMovie();
    //     res.render('search', {movies, query: req.query});
    // }
    search: async (req, res, url) => {

        const urlParams = new URLSearchParams(req.url);
        const title = urlParams.get('/search?title');
        const genre = urlParams.get('genre');
        const year = urlParams.get('year');

        let movies = await getAllMovies();
        if (title) {
            movies = movies.filter(movie =>
                movie.title.toLowerCase().includes(title.toLowerCase()));
        }
        if (genre) {
            movies = movies.filter(movie =>
                movie.genre.toLowerCase().includes(genre.toLowerCase()));
        }
        if (year) {
            movies = movies.filter(movie =>
                movie.year === parseInt(year));
        }
        console.log(movies);
        res.render('search', { movies });
    }
}; 