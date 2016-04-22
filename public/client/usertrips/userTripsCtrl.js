angular.module('canteen.userTripsCtrl', [])

.controller('userTripsCtrl', [
  '$scope',
  '$location',
  'userTrips',
  function($scope, $location, userTrips) {
    $scope.data = {};
    userTrips.getTrips()
      .then(function(trips) {
        $scope.data.trips = userTrips.poulateTrips(trips);
      });
  }
]);
