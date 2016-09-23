var app = angular.module('starter.controllers', []);

app.controller('AppCtrl', function($rootScope,
                                $scope,
                                $ionicModal,
                                $timeout,
                                $auth,
                                $ionicLoading) {
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    //console.log('Doing login', $scope.loginData);
  $ionicLoading.show({
    template: 'Logging in...'
  });
  $auth.submitLogin($scope.loginData)
    .then(function (resp) {
            // handle success response
    $ionicLoading.hide();
    $scope.closeLogin();
    })
    .catch(function (error) {
      $ionicLoading.hide();
      $scope.errorMessage = error;
    });
  };
    //.catch(function (error) {
      // handle error response
      //$scope.errorMessage = error;

  $rootScope.$on('auth:login-success', function(ev, user) {
    $scope.currentUser = user;
    });
  });


//     // Simulate a login delay. Remove this and replace with your login
//     // code if using a login system
//     $timeout(function() {
//       $scope.closeLogin();
//     }, 1000);
//   };
// })

  app.controller('TestController', function($scope) {
    $scope.gender = ['Male', 'Female'];
    $scope.ageValues = {
      min: 13,
      max: 60,
      value: 20
    };
    $scope.distanceValues = {
      min: 1000,
      max: 3500,
      value: 1000
    };
    $scope.data = {};
    $scope.calculateCooper = function() {
      var person = new Person({
        gender: $scope.data.gender,
        age: $scope.data.age,
        distance: $scope.data.distance
    });
    person.result($scope.data);
    $scope.person = person;
    console.log($scope.person);
    };
});
