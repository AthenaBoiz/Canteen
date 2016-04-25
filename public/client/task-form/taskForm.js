angular.module('canteen.taskForm', [])

//grab tripId from parent controller
.controller('taskForm', [
  '$scope',
  'formFactory',
  'trip',
  'socket',
  function($scope, formFactory, trip, socket) {
    $scope.taskForm = {
      statusCode: 0
    };

    $scope.createTask = function() {
      formFactory.submitTask($scope.taskForm, $scope.trip._id)
        .then(function(data) {
          if (data) {
            trip.getAllTasks($scope.trip._id)
              .then(function(data) {
                socket.emit('taskList:update', data);
              });
          }
        });

      $scope.taskForm = {
        statusCode: 0
      };

      trip.getTrip($scope.trip._id)
        .then(function(trip) {
          $scope.$parent.trip = trip;
        });
    };
  }
]);
