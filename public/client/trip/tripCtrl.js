angular.module('canteen.trip', [])

.controller('tripCtrl', [
  '$scope',
  'trip',
  'NgMap',
  '$stateParams',
  function ($scope, trip, NgMap, $stateParams) {
    trip.getTrip($stateParams.tripId)
    .then(function (tripData) {
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
