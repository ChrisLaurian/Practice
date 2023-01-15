'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

//Rutas de prueba
router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);

//Rutas utiles
router.post('/save', ArticleController.save);

module.exports = router;