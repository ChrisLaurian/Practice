'use strict'

var validator = require('validator');
var Article = require('../models/article');

var fs = require('fs');
var path = require('path');
const { exists } = require('../models/article');

var controller = {

    datosCurso: (req, res) => {
    
        return res.status(200).send({
            curso: 'Master en frameworks',
            autor: 'Victor robles'
    
        });
    },

    //Metodo de prueba
    test: (req, res) => {
        return res.status(200).send({
                message: 'Soy la accion de mi controlador de articulos'
        });
    },

    //Metodo de para guardar articulo
    save: (req, res) => {
        //recoger parametros
            var params = req.body;
            
        //Validar datos
             try {
                var validate_title = !validator.isEmpty(params.title);
                var validate_content = !validator.isEmpty(params.content);



             } catch (error) {
                return res.status(200).send({
                    status: 'error',
                    message: 'Faltan datos por enviar'
             });
             }

             if(validate_title && validate_content){
                //Crear el objeto
                var article = new Article();

                //Asignar Valores
                article.title = params.title;
                article.content = params.content;
                article.image = null;

                //Guardar el articulo
                article.save((err, articleStored) =>{
                    
                    if(err || !articleStored){
                        return res.status(404).send({
                            status: 'error',
                            message: 'el articulo no se guardo'
                     });
                    }
                    else{
                                //Devolver una respuesta
                                 return res.status(200).send({
                                   status: 'success',
                                  article: articleStored
                        });
                    }

                });

        
             }else{
                return res.status(200).send({
                    status: 'error',
                    message: 'Faltan datos por enviar'
             });
             }
        
    },


    //Metodo para regresar todos los articulos
    getArticles: (req, res) =>{ 

        var query = Article.find({});

        var last = req.params.last;
        if(last || last != undefined){
            query.limit(5);
        }

        //Find
        query.sort('-_id').exec((err, articles) =>{

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al recibir los articulos'
             });
            }
            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'no hay articulos para mostrar'
             });
            }
            return res.status(200).send({
                status: 'success',
                articles
        });
    });

        
    },

    //Metodo para regresar articulo por id
    getArticle: (req, res) =>{

        //Recogerer el id de la url
        var articleId = req.params.id;

        //Comprobar que existe
        if(!articleId || articleId == null){
            return res.status(404).send({
                status: 'Error',
                message: 'no existe el articulo'
        });
        }
        //Buscar el articulo
        Article.findById(articleId, (err, article) =>{

            if( err || !article){
                return res.status(404).send({
                    status: 'Error',
                    message: 'no existe el articulo'
            });

            }
            //Devolverlo en json
        return res.status(200).send({
            status: 'success',
            article
    });

        });
        
    },

    //Modificar actualizar articulo
    update: (req, res) =>{

        //Recoger el id del artuclo por el url
        var articleId = req.params.id;

        //Recoger datos que llegar por put
        var params = req.body;

        //Validar datos
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err){
            return res.status(500).send({
                status: 'Error',
                message: 'Faltan datos por enviar'
        });
        }

        if(validate_title && validate_content){
            //Find and update
             Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdate) =>{
                if(err){
                    return res.status(500).send({
                        status: 'Error',
                        message: 'Error al actualizar'
                });
                }
                if(!articleUpdate){
                    return res.status(404).send({
                        status: 'Error',
                        message: 'No existe el articulo'
                });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdate
            });
             });
        } else{
            //Devolver respuesta
            return res.status(500).send({
                status: 'Error',
                message: 'La validacion no es correcta'
        });
        }
    },
    //Metodo para eliminar
    delete: (req, res) =>{
        //Recoger el id por el url
            var articleId = req.params.id;

        //Find and Delete
        Article.findByIdAndDelete({_id: articleId}, (err, articleRemoved)=>{
            if(err){
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al borrar'
            });
            }
            if( !articleRemoved){
                return res.status(404).send({
                    status: 'Error',
                    message: 'No se ha borrado el articulo'
            });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
        });
        });
    },
    //Metodo para subir archivo
    upload: (req, res) =>{
        //Configurar el modulo connect multiparty router/article.js

        //Recoger el fichero de la peticion
        var file_name = 'Imagen no subida...';

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }
        //Conseguir el nombre y la extencion del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        //Nombre dle archivo
        var file_name = file_split[2];


        //Extencion del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        //comprobar la extension, solo imagenes, si es valida borrar el fichero 
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            //Borrar el archivo subido
            fs.unlink(file_path, (err) =>{
                return res.status(500).send({
                    status: 'Error',
                    message: 'La extencion de la imagen no es valida'
                });
            });
        }else{
        //si todo es valido
        var articleId = req.params.id;

        //Busca el articulo, asignarle nombre de la imagen y actualizarlo
        Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new:true}, (err, articleUpdated) =>{
            
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al guaradar la imagen'
                });
            }
            
            return res.status(200).send({
                status: 'success',
                article: articleUpdated
            });
        });
        }
    },
    //Metodo para mostrar imagen 
    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/' + file;
 
        if (fs.existsSync(path_file)) {
            return res.sendFile(path.resolve(path_file));
        } else {
            return res.status(404).send({
                status: 'error',
                mesagge: 'ninguna image con este nombre'
            });
        }
    } 

}; //end controllador

module.exports = controller;