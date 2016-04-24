angular.module('canteen.tripData', [])

.factory('trip', [
  '$http',
  '$location',
  function($http, $location) {
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
          console.log(58, res.data)
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

    // Factory methods use promises
    return {
      getTrip: getTrip,
      updateStatus: updateStatus,
      submitTaskUpdate: submitTaskUpdate,
      getAllTasks: getAllTasks,
      checkForUser: checkForUser
    };
  },
]);
