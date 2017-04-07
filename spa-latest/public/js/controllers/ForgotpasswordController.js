//========================================================================================================================================================================-----------------------------> 
var app = angular.module('module2');
app.controller('ForgotpasswordController',['$scope','$http','BMRCL','$timeout','$location', function($scope, $http, BMRCL,$timeout,$location){

//***************************************************************************************************************************************************  	 
 $scope.forgotpassword = function()
 {
	$scope.loading = true;
	
	BMRCL.forgotpassword($scope.emailid).then(function (responsedata) {	 
			
					if(responsedata.data.success == false)
					{
						$timeout(function () 
						{
							$scope.loading = false;
							$scope.errorStyle = {color: "red",'fontSize':'19px'}
							$scope.errorMessage = "Please check your agency email...!";
						}, 1000);				
					}
				   if(responsedata.data.success == true)
					{
						$timeout(function () 
						{
							$scope.loading = false;
							$location.path('/resetpassword');
						}, 1000);				
					}
					}, function (error) {
						if(error)
						console.log('Invalid Credentials');
				});
	
 }
//***************************************************************************************************************************************************  	 
}]);
//=========================================================================================================================================================================----------------------------> 


















