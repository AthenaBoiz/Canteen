angular.module('canteen.trip', [])

.controller('tripCtrl', [
  '$scope',
  'trip',
  'NgMap',
  '$stateParams',
  '$location',
  '$state',
  function ($scope, trip, NgMap, $stateParams, $location, $state) {
    $scope.trip = null;
    $scope.notUser = false;
    // console.log($stateParams.tripId);
    $scope.checkForUser = function(email) {
      trip.checkForUser(email)
        .then(function(user) {
          if (user.data) {
            $state.go('userView', { userId: user.data.id });
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
