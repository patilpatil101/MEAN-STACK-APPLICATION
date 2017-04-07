//========================================================================================================================================================================-----------------------------> 
var app = angular.module('module2');
app.controller('RegisterController',['$scope','$http','BMRCL','$timeout','$location','$mdDialog','$route', function($scope, $http, BMRCL,$timeout,$location,$mdDialog,$route){
	
app.controller('');

	$scope.data = {
    model: null,
    availableRoutes: [
      {id: '0', name: 'Tram, Streetcar, Light rail'},
      {id: '1', name: 'Subway Metro'},
      {id: '2', name: 'Rail'},
	  {id: '3', name: 'Bus'},
      {id: '4', name: 'Subway Metro'},
      {id: '5', name: 'Rail'},
	  {id: '6', name: 'Ferry'},
      {id: '7', name: 'Cable Car'},
      {id: '8', name: 'Gondola Suspended Cable Car'},
	  {id: '9', name: 'Funicular'}
	  
    ]
   };
//**************************************** Register Button Action ********************************************************************************************** 
$scope.checkMailStatus = function()
{		 
		  BMRCL.emailValidation($scope.agencyemail).then(function (responsedata) {
		  if(responsedata.data.success == true)
		  {
			$scope.errorStyle = {color: "red",'fontSize':'15px'} 
		    $scope.emailValidation = "The agency email is available";
		  }
		  else{
			$scope.errorStyle = {color: "red",'fontSize':'15px'} 
		    $scope.emailValidation = "The agency email you specified is already in use.";
		  }
		  
		  }, function (error) {
					console.error(error);
				});
	     
}
 $scope.register = function() 
 {
     if($scope.mobile == undefined && $scope.phone == undefined)
	  {
		  $scope.errorStyle = {color: "red",'fontSize':'15px'} 
		  $scope.mobileNumberValidation = "Please enter any one contact number";
	  }
	  else{
	
			var store = {
				
							AGENCYNAME      : $scope.agencyname,
							AGENCYEMAIL     : $scope.agencyemail,
							AGENCYPASSWORD  : $scope.pass,
							AGENCYROUTE 	: $scope.route,
							AGENCYWEBURL    : $scope.weburl,
							AGENCYMOBILE    : $scope.mobile,
							AGENCYPHONE     : $scope.phone,
							ACTIVE          : false
						}
						
				// call the create function from our service(returns a object)
				BMRCL.create(store).then(function (insertresponse) {
				
				if(insertresponse.data.success == false)
				 {
					 $scope.loading = true;
					 $timeout(function () 
					{
						//alert("Data not inserted.");
						$scope.errorStyle = {color: "red",'fontSize':'15px'} 
		                $scope.emailValidation = "The agency email you specified is already in use.";
						$scope.loading = false;
						console.log("Data not inserted");
					}, 3000);
					 
				 }
		    
		
				if(insertresponse.data.success == true)
				{
					
				  $scope.loading = true;
					$scope.agencyname   = "";
					$scope.agencyemail  = "";
					$scope.pass			= "";
					$scope.repass       = "";
					$scope.route        = "";
					$scope.weburl		= "";
					$scope.mobile		= "";
					$scope.phone		= "";
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
						'	<div><p> &nbsp&nbsp&nbsp&nbsp <br> Your registration is not fully completed, you have to verify &nbsp</p></div>'+
						'	<div><p> &nbsp&nbsp your agency email, click ok to verify your agency email.&nbsp&nbsp </p></div>'+
						'	<hr>'+
						'	<md-button style="clear:both;float: right;" ng-click="okDialog();">Ok</md-button>'+
						' 	</md-dialog-content>' +
						'	</md-dialog>',
					    locals: {
								 //gettting the value like agencyemail : $scope.agencyemail and pass this agencyemail to the controller.
							    },
						    controller : DialogController
					});
					
		     	function DialogController($scope, $mdDialog,$mdToast, $document) {
					 $scope.okDialog = function() { 
				     $mdDialog.hide();
				//Toast Message 
				$mdToast.show(
                        $mdToast.simple()
                        .textContent('An activation email has been sent to you. Please click the link in the email to finish the registration. Sometime it will take some few seconds to receive the mail!')                       
                        .hideDelay(12000)
                  );
					 $scope.agencyemail = store.AGENCYEMAIL;
				
				BMRCL.sendemail($scope.agencyemail).then(function (responsedata) {	 
			
					if(responsedata)
					{
						console.log('Email was successfully sent!');					
					}
				    else
					{
						console.log('Sending of mail failed.');	
				    }
					}, function (error) {
						if(error)
						console.log('Invalid Credentials');
				});
				
				
					};
				 };
						console.log("Data inserted",insertresponse);
						$location.path('/');
				
				  
				  }, 3000);
					
				 }
					
				}, function (error) {
					console.error(error);
				});

  }
		
 }

 $scope.test = function()
 {
	 alert('Hello World');
 }
 
 
            
//********************************************* Reset all the fields ****************************************************************** 
 $scope.reset = function()
 { 
		$scope.agencyname   = "";
		$scope.agencyemail  = "";
		$scope.pass			= "";
		$scope.repass       = "";
		$scope.route        = "";
		$scope.weburl		= "";
		$scope.mobile		= "";
		$scope.phone		= "";
 }
//******************************************************************************************************************************************** 
}]);
//=========================================================================================================================================================================----------------------------> 


















