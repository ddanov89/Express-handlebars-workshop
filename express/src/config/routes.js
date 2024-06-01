const { Router } = require('express');
const { catalog, details, search } = require('../controllers/catalog');
const { about } = require('../controllers/about');
const { notFound } = require('../controllers/404');
const { createGET, createPOST } = require('../controllers/movie');

const router = Router();

router.get('/', catalog);
router.get('/about', about);
router.get('/details/:id', details);
router.get('/create', createGET);
router.post('/create', createPOST);
router.get('/search', search);

router.get('*', notFound);

module.exports = { router };