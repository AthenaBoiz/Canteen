angular.module('canteen.user', [])

.controller('userCtrl', [
  '$scope',
  '$stateParams',
  'userTrips',
  'awsService',
  'authFactory',
  function ($scope, $stateParams, userTrips, awsService, authFactory) {
    // console.log($stateParams.userId);
    var imgTypes = ['image/jpeg', 'image/png'];
    $scope.user = {};

    $scope.userOwnsProfile = false;
    // $scope.user.given_name = 'John';
    // $scope.user.family_name = 'Doe';
    // $scope.user.email = 'johndoe@gmail.com';
    // $scope.user.favorite_trips = 'Disney World';
    // $scope.user.bio = "I am just a simple man. Not a simpleton. I wasn't referring to my brain capacity. I meant more like that I don't have expensive tastes. That sort of thing.";
    // $scope.user.image_url = 'img/face.svg';

    $scope.updateAble = false;

    $scope.trips = [];
    $scope.noTrips = true;

    authFactory.setUser()
      .then(function(user) {
        if (user.userId) {
          if (user.userId === $stateParams.userId) {
            $scope.userOwnsProfile = true;
          }
        }
      });

    userTrips.getUserInfo($stateParams.userId)
    .then(function(userData) {
      $scope.user = userData.user;
      if (Array.isArray(userData.trips) && userData.trips.length) {
        $scope.trips = userTrips.poulateTrips(userData.trips);
        $scope.noTrips = false;
      }
    });

    $scope.toggleProfileUpdate = function() {
      $scope.updateAble = !$scope.updateAble;
    };

    $scope.updateProfile = function() {
      $scope.toggleProfileUpdate();
      var profile = {
        favorite_trips: $scope.user.favorite_trips,
        bio: $scope.user.bio,
        image_url: $scope.user.image_url
      };
      userTrips.updateUser(profile, $scope.user.id)
        .then(function(data) {
          $scope.user.bio = data.bio;
          $scope.user.favorite_trips = data.favorite_trips;
        });
    };

    $scope.uploadFile = function(e) {
      var file = e.target.files[0];
      if (file.size > 40000) {
        alert('Please select an image smaller than 40kb.');
      } else if (file == null) {
        alert('No file selected.');
      } else if (imgTypes.indexOf(file.type) === -1) {
        alert('Please select a PNG or JPEG.');
      } else {
        awsService.getSignedReq(file)
        .then(function (putObj) {
          // console.log(file);
          awsService.uploadFile(file, putObj, function(url) {
            $scope.user.image_url = url;
            $scope.$apply();
            console.log($scope.user.image_url);
          });
        });
      }
    };
  }
]);
