//====================== Declare different different modules here e.g. module1,module2,etc. ===========================================================================================================================-------------------------------->
//***************************************************************************************************************************************************  	  
var app = angular.module('myApp', ['module1','module2','service','ngRoute','ngMaterial']);
//******************************************************************************************************************************************** 
(function () {
    'use strict';
     var app = angular.module('module1', ['ngRoute']);

//***************************************************************************************************************************************************  		 
  app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
//***************************************************************************************************************************************************  		 
  // $locationProvider for removing the # symbol from url.
  $locationProvider.html5Mode(true); 
//***************************************************************************************************************************************************  	 
  $routeProvider
  .when('/', {
    templateUrl : 'views/login.html',
    controller  : 'LoginController'
  })
//***************************************************************************************************************************************************  	  
 .otherwise({redirectTo: '/'});
 }]);

//***************************************************************************************************************************************************  		 
 })();
 
//******************************************************************************************************************************************** 
(function () {
    'use strict';
     var app = angular.module('module2', ['ngRoute','ngMaterial']);
//***************************************************************************************************************************************************  		 
  app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
//***************************************************************************************************************************************************  	  
  // $locationProvider for removing the # symbol from url.
  $locationProvider.html5Mode(true);
//***************************************************************************************************************************************************  	  
  $routeProvider
   .when('/register', {
    templateUrl : 'views/register.html',
    controller  : 'RegisterController'
  })
//***************************************************************************************************************************************************  	    
   .when('/emailconfirmationpage', {
    templateUrl : 'views/emailconfirmationpage.html',
    controller  : 'RegisterController'
  })
//***************************************************************************************************************************************************  	  
   .when('/route', {
    templateUrl : 'views/route.html',
    controller  : 'RouteController'
  })
//***************************************************************************************************************************************************  	  
   .when('/service', {
    templateUrl : 'views/service.html',
    controller  : 'ServiceController'
  })
//***************************************************************************************************************************************************  	  
   .when('/trip', {
    templateUrl : 'views/trip.html',
    controller  : 'TripController'
  })
//***************************************************************************************************************************************************  	  
   .when('/forgotpassword', {
    templateUrl : 'views/forgotpassword.html',
    controller  : 'ForgotpasswordController'
  })
//***************************************************************************************************************************************************  	    
   .when('/resetpassword', {
    templateUrl : 'views/resetpassword.html',
    controller  : 'ResetpasswordController'
  })
//***************************************************************************************************************************************************  	  
  .otherwise({redirectTo: '/'});

  }]);
//***************************************************************************************************************************************************  	
  })();
//=====================================================================================================================================================================-------------------------------->





