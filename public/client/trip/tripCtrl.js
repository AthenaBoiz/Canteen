angular.module('canteen.trip', [])

.controller('tripCtrl', [
  '$scope',
  'trip',
  'NgMap',
  '$stateParams',
  '$location',
  function ($scope, trip, NgMap, $stateParams, $location) {
    $scope.trip = null;
    $scope.notUser = false;
    // console.log($stateParams.tripId);
    $scope.checkForUser = function(email) {
      trip.checkForUser(email)
        .then(function(user) {
          console.log(user.data);
          if (user.data) {
            $location.path('/user/' + user.id);
          } else {
            $scope.notUser = true;
            setTimeout(function() {
              $scope.notUser = false;
              $scope.$apply();
            }, 2200)
          }
        });
    };

    trip.getTrip($stateParams.tripId)
    .then(function (tripData) {
      console.log(tripData)
      $scope.trip = tripData;
      $scope.dates = {
        start: moment($scope.trip.dates.start).format('MMM Do, YYYY'),
        end: moment($scope.trip.dates.end).format('MMM Do, YYYY')
      };
    });

    $scope.color = {
      colors: ['red', 'blue', 'purple', 'green', 'orange'],
    };
  },
]);
