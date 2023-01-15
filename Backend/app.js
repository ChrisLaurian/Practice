//'use strict'

//Cargar modulos de node para crear servidor
var express = require('express');
var bodyParse = require('body-parser');
const json = require('body-parser/lib/types/json');

//Ejecutar express(http)
var app = express();

//Cargar ficheros rutas
var article_router = require('./routes/article');

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json()); 

//CORS

//Añadir prefijos a rutas /cargar ruta
app.use('/', article_router);

//Ruta o metodo de prueba para el API


//Exportar modulo(fichero actual)
module.exports = app;