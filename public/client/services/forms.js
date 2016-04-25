angular.module('canteen.forms', [])

.factory('formFactory', [
  '$http',
  function($http) {
    function submitTrip(tripData) {
      return $http({
        method: 'POST',
        url: '/api/trip',
        data: tripData,
      })
      .then(function(resp) {
        return resp;
      })
      .catch(function(err) {
        console.error(err);
      });
    }

    function submitTask(taskData, tripId) {
      return $http({
        method: 'POST',
        url: '/api/task/add/' + tripId,
        data: taskData
      })
      .then(function(resp) {
        return resp.data;
      })
      .catch(function(err) {
        console.error(err);
      });
    }
    // Factory methods return promises
    return {
      submitTrip: submitTrip,
      submitTask: submitTask,
    };
  },
]);
