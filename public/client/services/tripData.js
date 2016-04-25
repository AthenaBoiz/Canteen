angular.module('canteen.tripData', [])

.factory('trip', [
  '$http',
  '$location',
  '$rootScope',
  function($http, $location, $rootScope) {
    function getTrip(tripId) {
      return $http({
          method: 'GET',
          url: '/api/trip/' + tripId,
        })
        .then(function(resp) {
          if (!resp.data._id) {
            $location.path('/#/landing-page');
            window.location.reload(true);
          }
          return resp.data;
        })
        .catch(function(err) {
          console.error(err);
        });
    }

    function updateStatus(trip) {
      return $http({
          method: 'PUT',
          url: '/api/trip/',
          data: trip,
        })
        .then(function(resp) {
          return resp.data;
        })
        .catch(function(err) {
          console.error(err);
        });
    }

    function submitTaskUpdate(taskData, tripId) {
      return $http({
          method: "PUT",
          url: '/api/tasks/update' + tripId,
          data: taskData
        })
        .then(function(res) {
          return res.data
        })
        .catch(function(err) {
          console.error(err);
        })
    }

    function getAllTasks(tripId) {
      return $http({
          method: "GET",
          url: '/api/tasks/getAll' + tripId,
        })
        .then(function(res) {
          //console.log(58, res.data)
          return res.data;
        })
        .catch(function(err) {
          console.error(err)
        })
    }

    function checkForUser(email) {
      return $http({
          method: 'GET',
          url: '/api/email/user' + email
        })
        .then(function(res) {
          // console.log(res);
          return res;
        })
        .catch(function(err) {
          console.error(err);
        });
    }

    //currently not in use, form updates tasklist
    function refreshTasks($rootScope) {
      console.log('in!')
      $rootScope.$broadcast('refresh');
    }

    function updateTask(task) {
      return $http({
          method: 'PUT',
          url: '/api/task/update2',
          data: task
        })
        .then(function(res) {
          return res;
        })
        .catch(function(err) {
          console.error(err);
        })
    }

    function deleteTask(taskId) {
      return $http({
          method: 'DELETE',
          url: '/api/task/delete/' + taskId,
        })
        .then(function(res) {
          console.log(res.data)
          return res.data;
        })
        .catch(function(err) {
          console.error(err)
        })
    }

    function updateTrip(trip) {
      return $http({
          method: 'PUT',
          url: '/api/trip/update',
          data: trip
        })
        .then(function(res) {
          console.log(res.data)
          return res.data;
        })
        .catch(function(err) {
          console.error(err);
        })
    }

    function deleteTrip(tripId) {
      return $http({
          method: 'DELETE',
          url: '/api/trip/delete' + tripId
        })
        .then(function(res) {
          console.log(res)
          return res.data;
        })
        .catch(function(err) {
          console.error(err);
        })
    }

    // Factory methods use promises
    return {
      getTrip: getTrip,
      updateStatus: updateStatus,
      submitTaskUpdate: submitTaskUpdate,
      getAllTasks: getAllTasks,
      checkForUser: checkForUser,
      refreshTasks: refreshTasks,
      updateTask: updateTask,
      deleteTask: deleteTask,
      updateTrip: updateTrip,
      deleteTrip: deleteTrip
    };
  },
]);
