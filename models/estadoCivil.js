var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var estado_civilSchema = new Schema({  
    nombre: String
});

module.exports = mongoose.model('Estado_Civil', estado_civilSchema); 