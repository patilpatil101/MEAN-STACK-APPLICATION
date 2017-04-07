//========================================================================================================================================================================------------------------------->
var app = angular.module('module2');
app.controller('TestController',['$scope', function($scope){

  var self = this;
              self.user={id:null,username:'',address:'',email:''};
              self.id = 4;
               
              self.users = [// In future posts, we will get it from server using service
                      {id:1, username: 'BYPH', address: 'Baiyappanhalli', email: 'abc@abc.com'},
                      {id:2, username: 'MGROAD', address: 'Mahatma Ghandhi Road', email: 'bca@abc.com'},
                      {id:3, username: 'NGSA', address: 'Nagasandra', email: 'cdac@abc.com'}
              ];
               
              self.submit = function() {
                  if(self.user.id === null){
                      self.user.id = self.id++;
                      console.log('Saving New User', self.user);    
                      self.users.push(self.user);//Or send to server, we will do it in when handling services
                  }else{
                      for(var i = 0; i < self.users.length; i++){
                          if(self.users[i].id === self.user.id) {
                            self.users[i] = self.user;
                            break;
                          }
                      }
                     console.log('User updated with id ', self.user.id);
                  }
                  self.reset();
              };
               
              self.edit = function(id){
                  console.log('id to be edited', id);
                  for(var i = 0; i < self.users.length; i++){
                      if(self.users[i].id === id) {
                         self.user = angular.copy(self.users[i]);
                         break;
                      }
                  }
              }
               
              self.remove = function(id){
                  console.log('id to be deleted', id);
                  for(var i = 0; i < self.users.length; i++){
                      if(self.users[i].id === id) {
                         self.users.splice(i,1);
                         if(self.user.id === id){//It is shown in form, reset it.
                            self.reset();
                         }
                         break;
                      }
                  }
              }
               
              self.reset = function(){
                  self.user={id:null,username:'',address:'',email:''};
                  $scope.myForm.$setPristine(); //reset Form
              }
 
	}]);
//==========================================================================================================================================================================----------------------------->