//========================================================================================================================================================================-----------------------------> 
var app = angular.module('module2');
app.controller('ResetpasswordController',['$scope','$http','BMRCL','$timeout','$location','$mdDialog', function($scope, $http, BMRCL,$timeout,$location,$mdDialog){

//***************************************************************************************************************************************************  	 
$scope.changepassword = function() 
 {	
	var password        = $scope.newpassword;
	var confirmpassword = $scope.confirmpassword;
		if(password == confirmpassword)
		{
			
				BMRCL.forgotpassword($scope.email).then(function (responsedata) {	 
					if(responsedata.data.success == false)
				    {
						
						$mdDialog.show
						({
							parent: angular.element(document.body),
							clickOutsideToClose:false,
							//write the full html code in template or else you can create a seperate html file and give the path here.
							//e.g.    templateUrl: 'views/DialogForm.html',
							template:
							'	<md-dialog md-theme="mytheme">' +
							'  	<md-dialog-content>'+
							'	<div><p> &nbsp&nbsp&nbsp&nbsp <br> &nbsp&nbsp&nbsp Agency email not found in our database please create a new account...!  &nbsp</p></div>'+
							'	<hr>'+
							'	<md-button style="float: right;" ng-click="okDialog();">Ok</md-button>'+
							' 	</md-dialog-content>' +
							'	</md-dialog>',
							locals: {
								 //gettting the value like email : $scope.email and pass this email to the DialogController.
									email           : $scope.email,
									confirmpassword : $scope.confirmpassword
								},
						    controller : DialogController
					    });	
					function DialogController($scope, $mdDialog,$mdToast, $document,email,confirmpassword)
					{
						
						$scope.okDialog = function()
						{
							$mdDialog.hide();
							$location.path('/register');
						}
					};
					
				    }
				   if(responsedata.data.success == true)
					{
						$timeout(function () 
						{
							$scope.loading = false;
						
				$mdDialog.show
					({
						parent: angular.element(document.body),
						clickOutsideToClose:false,
						//write the full html code in template or else you can create a seperate html file and give the path here.
						//e.g.    templateUrl: 'views/DialogForm.html',
						template:
						'	<md-dialog md-theme="mytheme">' +
						'  	<md-dialog-content>'+
						'	<div><p> &nbsp&nbsp&nbsp&nbsp <br> &nbsp&nbsp&nbsp Are your sure you want to change the password?  &nbsp</p></div>'+
						'	<hr>'+
						'	<md-button style="float: left;"  ng-click="cancleDialog();">Cancle</md-button>'+
						'	<md-button style="float: right;" ng-click="okDialog();">Ok</md-button>'+
						' 	</md-dialog-content>' +
						'	</md-dialog>',
					    locals: {
								 //gettting the value like email : $scope.email and pass this email to the controller.
									email           : $scope.email,
									confirmpassword : $scope.confirmpassword
								},
						    controller : DialogController
					});
							
				 function DialogController($scope, $mdDialog,$mdToast, $document,email,confirmpassword) {
					 $scope.cancleDialog = function() { 
				     $mdDialog.hide();
					 
					 };
					  $scope.okDialog = function() { 
				      $mdDialog.hide();
						
	//*************						
	BMRCL.changepassword(email,confirmpassword).then(function (responsedata) {	 
			
					if(responsedata.data.success == false)
					{
						$timeout(function () 
						{
							$scope.loading = false;
							
							
						}, 1000);				
					}
				   if(responsedata.data.success == true)
					{
						$timeout(function () 
						{
							$scope.loading = false;
							
				$mdDialog.show
					({
						parent: angular.element(document.body),
						clickOutsideToClose:false,
						//write the full html code in template or else you can create a seperate html file and give the path here.
						//e.g.    templateUrl: 'views/DialogForm.html',
						template:
						'	<md-dialog md-theme="mytheme">' +
						'  	<md-dialog-content>'+
						'	<div><p> &nbsp&nbsp&nbsp&nbsp&nbsp <br> &nbsp&nbsp Your password has been successfully changed &nbsp&nbsp</p></div>'+
						'	<div><p> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp click ok to login your account.&nbsp&nbsp </p></div>'+
						'	<hr>'+
						'	<md-button style="clear:both;float: right;" ng-click="okDialog();">Ok</md-button>'+
						' 	</md-dialog-content>' +
						'	</md-dialog>',
					    locals: {
								 //gettting the value like agencyemail : $scope.agencyemail and pass this agencyemail to the controller.
							    },
						    controller : DialogController
					});
					
					function DialogController($scope, $mdDialog,$mdToast, $document)
					{
						$scope.okDialog = function() 
						{ 
							$mdDialog.hide();
					        $scope.email = "";
							$scope.newpassword = "";
							$scope.confimpassword = "";
							$location.path('/');
					    };
					};
						
						
						}, 1000);				
					}
					}, function (error) {
						if(error)
						console.log('Invalid Credentials');
				});
					  
					  
		//********************			  
					  
					 };
					};					 
						
				
						}, 1000);				
					}
					}, function (error) {
						if(error)
						console.log('Invalid Credentials');
				});
		}			
		else{
			
						$mdDialog.show
						({
							parent: angular.element(document.body),
							clickOutsideToClose:false,
							//write the full html code in template or else you can create a seperate html file and give the path here.
							//e.g.    templateUrl: 'views/DialogForm.html',
							template:
							'	<md-dialog md-theme="mytheme">' +
							'  	<md-dialog-content>'+
							'	<div><p> &nbsp&nbsp&nbsp&nbsp <br> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp Please check your password.  &nbsp</p></div>'+
							'	<hr>'+
							'	<md-button style="float: right;" ng-click="okDialog();">Ok</md-button>'+
							' 	</md-dialog-content>' +
							'	</md-dialog>',
							locals: {
								 //gettting the value like email : $scope.email and pass this email to the DialogController.
									email           : $scope.email,
									confirmpassword : $scope.confirmpassword
								},
						    controller : DialogController
					    });	
					function DialogController($scope, $mdDialog,$mdToast, $document,email,confirmpassword)
					{
						
						$scope.okDialog = function()
						{
							$mdDialog.hide();
							
						}
					};
		}
	 
		 
	
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
//***************************************************************************************************************************************************  	 
}]);
//=========================================================================================================================================================================----------------------------> 


















