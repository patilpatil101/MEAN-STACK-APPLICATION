//========================================================================================================================================================================------------------------------->
var app = angular.module('module2');
app.controller('RouteController',['$scope','BMRCL','$location','$timeout', function($scope,BMRCL,$location,$timeout){
//***************************************************************************************************************************************************  	 
 $scope.yes = function()
 {
	 alert('Inside Yes');
 }

//***************************************************************************************************************************************************  	 
  $scope.logout = function()
 {
		$scope.loading = true;
	    $timeout(function () 
		  {
			 $scope.loading = false;
		  }, 3000);
						
		//logout service call				
		BMRCL.logout().then(function (logoutres) {
				 
				 if(logoutres)
				 {
					$location.path('/'); 
					console.log("Logout Successfull");
					
				 }
					
				}, function (error) {
					console.error(error);
					return res.redirect('/');
				});
				
 }

 
 
//***************************************************************************************************************************************************  	 
 $scope.data = {
    model: null,
    availableRoutes: [
      {id: '0', name: 'Baiyappanhalli'},
      {id: '1', name: 'S.V.Road'},
      {id: '2', name: 'Indiranagar'},
	  {id: '3', name: 'Halasuru'},
      {id: '4', name: 'Trinity'},
      {id: '5', name: 'M.G.Road'},
	 	  
    ]
   }; 
    $scope.data2 = {
    model: null,
    availableRoute: [
      {id: '0', name: 'Baiyappanhalli'},
      {id: '1', name: 'S.V.Road'},
      {id: '2', name: 'Indiranagar'},
	  {id: '3', name: 'Halasuru'},
      {id: '4', name: 'Trinity'},
      {id: '5', name: 'M.G.Road'},
	 	  
    ]
   }; 
//***************************************************************************************************************************************************  	
	$scope.data1 = {
    model: null,
    routeshortname: [
      {id: '0', name: 'Purple Line'},
      {id: '1', name: 'Green Line'},
    
    ]
   };
//********************************************************************************************************************	
	$scope.trips = function() 
 {
	 alert('Inside Create');

	 var route        = $scope.route;
	 var startdate    = $scope.startdate;
	 var enddate   	  = $scope.enddate;
	 var headsignto   = $scope.headsignto;
	 
	 $scope.route 	     = route;
	 $scope.startdate    = startdate;
	 $scope.enddate      = enddate;
	 $scope.headsignto   = headsignto;s
 }
 
 
 
	}]);
//==========================================================================================================================================================================----------------------------->