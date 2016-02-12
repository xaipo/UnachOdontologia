var app = angular.module('chirpApp', ['tareas','ngRoute', 'ngResource']).run(function($http, $rootScope) {
  $rootScope.authenticated = false;
  $rootScope.current_user = 'Guest';
   $rootScope.notificacion = 0;

  $rootScope.signout = function(){
    $http.get('auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = 'Guest';
    $rootScope.notificacion = 0;
  };
});


app.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/main', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'authController'
		})
       
       .when('/estudiante', {
			templateUrl: 'estudiante.html',
		})	
        .when('/vistapaciente', {
			templateUrl: 'vistapaciente.html',
            controller: 'ctrlAlta'
		})	
        
        .when('/historia', {
			templateUrl: 'historia.html',
            })	
                .when('/starter', {
			templateUrl: 'starter.html',
            })	
            
       .when('/nuevoPaciente', {
			templateUrl: 'nuevoPaciente.html',
			
		
		})
        
        .when('/odontograma', { templateUrl: 'testeSVG.html',})
      
        
          .when('/alta', { templateUrl: 'alta.html',controller: 'ctrlAlta' })
          
           .when('/nuevoAlta', { templateUrl: 'nuevoAlta.html',controller: 'ctrlAlta' })
           .when('/nuevaHistoria', { templateUrl: 'NuevaHistoria.html' })
            
            .when('/editar', { templateUrl:'editar.html',controller: 'ctrlEditar' })
            
            .otherwise({ redirectTo: '/' });
            
            
});


app.factory('postService', function($resource){
  return $resource('/api/posts/:id');
});


app.controller('mainController', function($rootScope,$scope, postService){
  $scope.posts = postService.query();
  $scope.newPost = {created_by: '', text: '', created_at: ''};

  
  $scope.post = function() {
  $scope.newPost.created_by = $rootScope.current_user;
  $scope.newPost.created_at = Date.now();
  postService.save($scope.newPost, function(){
    $scope.posts = postService.query();
    $scope.newPost = {created_by: '', text: '', created_at: ''};
  });
};
  
  
  
  
});


app.controller('authController', function($scope, $http, $rootScope, $location){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
           console.log("entro");
		$http.post('/auth/login', $scope.user).success(function(data){
		
        	
                console.log("entro");
                
                console.log(data);
            if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/main');
            
                
               //  window.location ='index.html';
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};

	$scope.register = function(){
		$http.post('/auth/signup', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.current_user = data.user.username;
				$location.path('/');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};
});