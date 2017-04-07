//===========================================================================================================================================================================-------------------------->
var app = angular.module('module1');
app.controller('LoginController',['$scope','$http','BMRCL','$location','$timeout', function($scope, $http, BMRCL,$location,$timeout){
 
//*************************************** Login Button Action ***************************************************************************************  
 $scope.login = function() 
 {
//****************************************** Authentication ***************************************************************************************  
	// loading the processing icon
	$scope.loading = true;

//***************************************************************************************************************************************************  	
	BMRCL.authenticateUser($scope.uname,$scope.pass).then(function (responsedata) {	 
				if(responsedata.data.success == true)
				 {
					$location.path('/route'); 
				 }
				if(responsedata.data.success == false)
				 {
					$timeout(function () 
						{
							$scope.loading = false;
							$scope.errorStyle = {color: "red",'fontSize':'19px'}
							$scope.errorMessage = "Your agency email or password is incorrect. Please try again...!";
						}, 1000);						
						
				 }
				 if(responsedata.data.errors)
				 {
					$timeout(function () 
						{
							$scope.loading = false;
							$scope.errorStyle = {color: "red",'fontSize':'19px'}
							$scope.errorMessage = "Your account has not been activated. Please activate your account.";
						}, 1000);						
						
				 }
				 if(responsedata.data.error)
				 {
					$timeout(function () 
						{
							$scope.loading = false;
							$scope.errorStyle = {color: "red",'fontSize':'19px'}
							$scope.errorMessage = "Your agency email or password is incorrect. Please try again...!";
						}, 1000);						
						
				 }
					
				
					}, function (error) {
					
					if(error)
						console.log('Invalid Credentials');
				});
										
 }
 
//***************************************** Toggle Password Visibility ***************************************************************************************  
	
	$scope.inputType = 'password';
  // Hide & show password function
  $scope.hideShowPassword = function(){
    if ($scope.inputType == 'password')
        $scope.inputType = 'text';
    else
        $scope.inputType = 'password';
  };

	}]);
//==========================================================================================================================================---------------------->


















































