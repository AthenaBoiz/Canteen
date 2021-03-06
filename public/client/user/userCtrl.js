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
          awsService.uploadFile(file, putObj, function(url) {
            $scope.user.image_url = url;
            $scope.$apply();
          });
        });
      }
    };
  }
]);
