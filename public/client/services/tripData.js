angular.module('canteen.tripData', [])

.factory('trip', [
  '$http',
  '$location',
  function ($http, $location) {
    function getTrip(tripId) {
      return $http({
        method: 'GET',
        url: '/api/trip/' + tripId,
      })
      .then(function (resp) {
        if ( !resp.data._id ) {
          $location.path('/#/landing-page');
          window.location.reload(true);
        }
        return resp.data;
      })
      .catch(function (err) {
        console.error(err);
      });
    }

    function updateStatus(trip) {
      return $http({
        method: 'PUT',
        url: '/api/trip/',
        data: trip,
      })
      .then(function (resp) {
        return resp.data;
      })
      .catch(function (err) {
        console.error(err);
      });
    }

    // Factory methods use promises
    return {
      getTrip: getTrip,
      updateStatus: updateStatus,
    };
  },
]);
