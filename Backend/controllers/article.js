'use strict'

var validator = require('validator');
var Article = require('../models/article');

var controller = {

    datosCurso: (req, res) => {
    
        return res.status(200).send({
            curso: 'Master en frameworks',
            autor: 'Victor robles'
    
        });
    },

    test: (req, res) => {
        return res.status(200).send({
                message: 'Soy la accion de mi controlador de articulos'
        });
    },

    save: (req, res) => {
        //recoger parametros
            var params = req.body;
            
        //Validar datos
             try {
                var validate_title = !validator.isEmpty(params.title);
                var validate_content = !validator.isEmpty(params.content);



             } catch (error) {
                return res.status(200).send({
                    message: 'Faltan datos por enviar'
             });
             }

             if(validate_title && validate_content){
                //Crear el objeto

                //Asignar Valores

                //Guardar el articulo

                //Devolver una respuesta
        return res.status(200).send({
            article: params
     });
             }else{
                return res.status(200).send({
                    message: 'Faltan datos por enviar'
             });
             }
        
    }

}; //end controllador

module.exports = controller;