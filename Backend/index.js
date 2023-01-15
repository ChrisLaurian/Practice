

const mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.set("strictQuery", true);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/api_rest_blog", {useNewUrlParser:true})
.then(()=>{
console.log('La conexión a la base de datos se ha realizado correctamente');

//Crear servidor y escuchar peticiones HTTP
app.listen(port, () => {
    console.log('Servidor corriendo en httphost:'+port);
})

});