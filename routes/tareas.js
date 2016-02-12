var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


var mongoose = require('mongoose');

var Tareas = mongoose.model('Tareas');

//get -listar tareas
router.get('/tareas', function (req, res, next) {
    Tareas.find(function (err, tareas) {
        if (err) { return next(err) }
        res.json(tareas);
    })

});

//post agregar tarea


router.post('/tarea', function (req, res, next) {
    var tarea = new Tareas(req.body);

    tarea.save(function (err, tarea) {
        if (err) { return next(err) }
        res.json(tarea);
    })
});


//put actualizar tarea

router.put('/tarea/:id', function (req, res) {
    Tareas.findById(req.params.id, function (err, tarea) {
        tarea.cedula = req.body.cedula;
        tarea.nombre = req.body.nombre;
        tarea.apellido = req.body.apellido;
        tarea.email = req.body.email;
        tarea.fecha_de_nacimiento = req.body.fecha_de_nacimiento;
        tarea.sexo = req.body.sexo;
        tarea.estado_civil = req.body.estado_civil;
        tarea.direccion = req.body.direccion;
        tarea.lugar_de_residencia = req.body.lugar_de_residencia;
        tarea.telefono = req.body.telefono;
        tarea.celular = req.body.celular;
        tarea.profesion = req.body.profesion;
        tarea.ocupacion = req.body.ocupacion;
        tarea.contacto_de_emergencia = req.body.contacto_de_emergencia;
        tarea.contacto_telefono = req.body.contacto_telefono;
        tarea.contacto_celular = req.body.contacto_celular;



        tarea.save(function (err) {
            if (err) { res.send(err) }
            res.json(tarea);
        })
    })

});

//delete eliminar tareas

router.delete('/tarea/:id', function (req, res) {
    Tareas.findByIdAndRemove(req.params.id, function (err) {
        if (err) { res.send(err) }
        res.json({ message: 'la tarea se ha eliminado' });
    })

});


module.exports = router;
