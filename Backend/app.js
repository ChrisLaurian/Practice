//'use strict'

//Cargar modulos de node para crear servidor
var express = require('express');
var bodyParse = require('body-parser');
const json = require('body-parser/lib/types/json');

//Ejecutar express(http)
var app = express();

//Cargar ficheros rutas

//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json()); 

//CORS

//Añadir prefijos a rutas

//Ruta o metodo de prueba para el API
app.get('/datos', (req, res) => {
    
    return res.status(200).send({
        curso: 'Master en frameworks',
        autor: 'Victor robles'

    });
});

//Exportar modulo(fichero actual)
module.exports = app;