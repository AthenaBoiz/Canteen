angular.module('canteen.taskView', ['xeditable'])

.controller('taskView', [
  '$scope',
  'trip',
  'formFactory',

  function($scope, trip) {
    $scope.taskList = {};
    trip.getAllTasks($scope.trip._id)
      .then(function(data){
        $scope.taskList = data;
    console.log(13, $scope.taskList)
      })
    $scope.updateStatus = function(task) {
      // Toggles status code between 0 and 1
      // and updates in db
      task.statusCode = task.statusCode ? 0 : 1;
      trip.updateStatus($scope.trip);
    };
    $scope.updateTask = function() {
      formFactory.submitTaskUpdate($scope.trip.task)

    }
  },





]);
