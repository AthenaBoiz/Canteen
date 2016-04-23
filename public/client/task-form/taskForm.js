angular.module('canteen.taskForm', [])

//grab tripId from parent controller
.controller('taskForm', [
  '$scope',
  'formFactory',
  'trip',
  function ($scope, formFactory, trip) {
    $scope.taskForm = {
      statusCode: 0
    };

    $scope.createTask = function () {
      formFactory.submitTask($scope.taskForm, $scope.trip._id);
      console.log($scope.taskForm)
      $scope.taskForm = {
        statusCode: 0
      };
      // $scope.bullets = [];

      trip.getTrip($scope.trip._id)
      .then(function (trip) {
        $scope.$parent.trip = trip;
      })
    };
  },
]);
