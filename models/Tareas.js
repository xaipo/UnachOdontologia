var mongoose = require('mongoose');
//var Schema = mongoose.Schema; 
//var Estado_Civil = mongoose.model('Estado_Civil');

var TareasSchema = new mongoose.Schema({
    cedula: String,
    nombre: String,
    apellido: String,
    email: String,
    fecha_de_nacimiento: Date,
    sexo: String,
    //   estado_civil: { type: Schema.ObjectId, ref: "Estado_Civil" } ,
    estado_civil:String,
    direccion: String,
    lugar_de_residencia: String,
    telefono: String,
    celular: String,
    profesion: String,
    ocupacion: String,
    contacto_de_emergencia: String,
    contacto_telefono: String,
    contacto_celular: String
    


});

mongoose.model('Tareas', TareasSchema);

