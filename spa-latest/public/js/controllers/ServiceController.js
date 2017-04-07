//======================================================================================================================================================================--------------------------------->
var app = angular.module('module2');
app.controller('ServiceController',['$scope','BMRCL','$location','$timeout', function($scope,BMRCL,$location,$timeout){
  
//***************************************************************************************************************************************************  	
 $scope.pageName = "Contact Details";
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

	}]);
//=======================================================================================================================================================================-------------------------------->