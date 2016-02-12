var tareasModule = angular.module('tareas', []);


tareasModule.factory('comun', function ($http) {

    var comun = {};

    comun.tareas = [];

    comun.tarea = {};



    //seccionmetodos remotos

    comun.getAll = function () {

        return $http.get('/tareas')
            .success(function (data) {
                angular.copy(data, comun.tareas);

                return comun.tareas;
            })
    };


    comun.add = function (tarea) {

        return $http.post('/tarea', tarea)
            .success(function (tarea) {
                comun.tareas.push(tarea);
            })
    };


    comun.update = function (tarea) {
        return $http.put('/tarea/' + tarea._id, tarea)
            .success(function (data) {
                var indice = comun.tareas.indexOf(tarea);
                comun.tareas[indice] = data;
            })


    };

    comun.delet = function (tarea) {
        return $http.delete('/tarea/' + tarea._id)
            .success(function () {

                var indice = comun.tareas.indexOf(tarea);
                comun.tareas.splice(indice, 1);

            })

    };

    return comun;

});




tareasModule.controller('ctrlAlta', function ($scope, $location, comun) {

    $scope.tarea = {};
    //$scope.tareas=[];


    comun.getAll();



    $scope.tareas = comun.tareas;

    $scope.prioridades = ['baja', 'normal', 'alta'];

    $scope.agregar = function () {
        comun.add({
            cedula: $scope.tarea.cedula,
            nombre: $scope.tarea.nombre,
            apellido: $scope.tarea.apellido,
            email: $scope.tarea.email,
            fecha_de_nacimiento: $scope.tarea.fecha_de_nacimiento,
            sexo: $scope.tarea.sexo,
            estado_civil: $scope.tarea.estado_civil,
            //  prioridad: parseInt($scope.tarea.prioridad)
                direccion: $scope.tarea.direccion,
                lugar_de_residencia: $scope.tarea.lugar_de_residencia,
                telefono: $scope.tarea.telefono,
                celular: $scope.tarea.celular,
                profesion: $scope.tarea.profesion,
                ocupacion: $scope.tarea.ocupacion,
                contacto_de_emergencia: $scope.tarea.contacto_de_emergencia,
                contacto_telefono: $scope.tarea.contacto_telefono,
                contacto_celular: $scope.tarea.contacto_celular
            
            

        });
        $scope.tarea.cedula = '';
        $scope.tarea.nombre = '';
        $scope.tarea.apellido = '';
         $scope.tarea.email = '';
          $scope.tarea.fecha_de_nacimiento = '';
           $scope.tarea.sexo = '';
            $scope.tarea.estado_civil = '';
        //    $scope.tarea.prioridad = '';

       
        $location.path('/alta');
   

    };



    $scope.masPrioridad = function (tarea) {
        tarea.prioridad += 1;

    };
    $scope.menosPrioridad = function (tarea) {
        tarea.prioridad -= 1;

    };

    $scope.eliminar = function (tarea) {
        comun.delet(tarea);

    };

    $scope.procesarObjeto = function (tarea) {
        comun.tarea = tarea;
        $location.path('/editar');

    };


});



tareasModule.controller('ctrlEditar', function ($scope, $location, comun) {
    $scope.tarea = comun.tarea;

    $scope.actualizar = function () {

        comun.update($scope.tarea);

        $location.path('/alta');

    };

    $scope.eliminar = function () {
        comun.delet($scope.tarea);
        $location.path('/alta');
    }



});


