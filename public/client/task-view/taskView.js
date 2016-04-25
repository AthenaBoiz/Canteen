angular.module('canteen.taskView', ['xeditable'])

.controller('taskView', [
  '$scope',
  'trip',
  'formFactory',
  'taskHolder',

  function($scope, trip, taskHolder) {
    $scope.taskList = {};
    trip.getAllTasks($scope.trip._id)
      .then(function(data) {
        $scope.taskList = data
      });

    $scope.updateStatus = function(task) {
      // Toggles status code between 0 and 1
      // and updates in db
      task.statusCode = task.statusCode ? 0 : 1;
      trip.updateStatus($scope.trip);
    };

    $scope.updateTask = function(task) {
      trip.updateTask(task);
    };

    $scope.removeTask = function(task, index) {
      trip.deleteTask(task._id)
        .then(function(data) {
          if (data) {
            trip.getAllTasks($scope.trip._id)
              .then(function(data) {
                $scope.taskList = data
              });
          }
        })
    }

    $scope.$on('refresh', function() {
      trip.getAllTasks($scope.trip._id)
        .then(function(data) {
          $scope.taskList = data;
        });
    });
  }
])

.factory('taskHolder', ['$rootScope',
  function($rootScope) {
    function refreshTasks() {
      $rootScope.$broadcast('refresh');
    }
    return {
      refreshTasks: refreshTasks
    }
  }
]);
