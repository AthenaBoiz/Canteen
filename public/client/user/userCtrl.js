angular.module('canteen.user', [])

.controller('userCtrl', [
  '$scope',
  '$stateParams',
  'userTrips',
  function ($scope, $stateParams, userTrips) {
    // console.log($stateParams.userId);

    $scope.user = {};
    $scope.user.given_name = 'John';
    $scope.user.family_name = 'Doe';
    $scope.user.email = 'johndoe@gmail.com';
    $scope.user.favorite_trips = 'Disney World';
    $scope.user.bio = "I am just a simple man. Not a simpleton. I wasn't referring to my brain capacity. I meant more like that I don't have expensive tastes. That sort of thing.";

    $scope.updateAble = false;

    $scope.trips = [];
    $scope.noTrips = true;

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
        bio: $scope.user.bio
      };
      userTrips.updateUser(profile, $scope.user.id)
        .then(function(data) {
          $scope.user.bio = data.bio;
          $scope.user.favorite_trips = data.favorite_trips;
        });
    };

  }
]);
