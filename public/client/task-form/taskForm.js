angular.module('canteen.taskForm', [])

//grab tripId from parent controller
.controller('taskForm', [
  '$scope',
  'formFactory',
  'trip',
  'taskHolder',

  function($scope, formFactory, trip, taskHolder) {
    $scope.taskForm = {
      statusCode: 0
    };

    $scope.createTask = function() {
      formFactory.submitTask($scope.taskForm, $scope.trip._id)
        .then(function(data) {
          if (data) {
            taskHolder.refreshTasks();
          }
        });

      $scope.taskForm = {
        statusCode: 0
      };
      // $scope.bullets = [];

      trip.getTrip($scope.trip._id)
        .then(function(trip) {
          $scope.$parent.trip = trip;
        })
    };
  }
]);
