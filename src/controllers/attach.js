const { getMovieById, attachCastToMovie } = require("../services/movie");
const { getAllCast } = require('../services/cast');

module.exports = {
    attachGet: async (req, res) => {
        const id = req.params.id;
        const movie = await getMovieById(id);

        if (!movie) {
            res.render('404');
            return;
        }
        const cast = await getAllCast();
        const castInMovie = movie.cast.map(id => id.toString());

        res.render('cast-attach', { movie, cast: cast.filter(c => !castInMovie.find(castId => castId == c._id.toString())) });
    },
    attachPost: async (req, res) => {

        const movieId = req.params.id;
        const castId = req.body.cast;

        if (!movieId || !castId) {
            console.error(`Missing ${movieId} or ${castId}`);
            res.status(400).end();
            return;
        }


        if (castId == 'none') {
            const movie = await getMovieById(movieId);
            const cast = await getAllCast();
            res.render('cast-attach', { movie, cast, error: true });
            return;
        }
        try {
            await attachCastToMovie(movieId, castId);
        } catch (error) {
            console.error('Error adding cast to movie', error);
            res.status(400).end();
        }
        res.redirect('/details/' + movieId);
    }
};