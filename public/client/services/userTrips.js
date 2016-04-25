angular.module('canteen.userTrips', [])

.factory('userTrips', [
  '$http',
  function($http) {

    var getUserInfo = function(userId) {
      return $http({
        method: 'GET',
        url: '/api/user/' + userId
      })
      .then(function(res) {
        return res.data;
      })
      .catch(function(err) {
        console.error(err);
      });
    };

    var updateUser = function(data, userId) {
      return $http({
        method: 'PUT',
        url: '/api/user/' + userId,
        data: data
      })
      .then(function(res) {
        return res.config.data;
      })
      .catch(function(err) {
        console.error(err);
      });
    };

    var poulateTrips = function(data) {
      var tripsArr = [];
      if (Array.isArray(data)) {
        data.forEach(function(e) {
          var trip = {};
          trip.uglyStart = e.dates.start;
          trip.start = moment(e.dates.start).format('MMM Do, YYYY');
          trip.end = moment(e.dates.end).format('MMM Do, YYYY');
          trip.name = e.tripName;
          trip.location = e.location;
          trip.id = e._id;
          trip.members = e.members;
          tripsArr.push(trip);
        });
      }
      return tripsArr;
    };

    return {
      getUserInfo: getUserInfo,
      poulateTrips: poulateTrips,
      updateUser: updateUser
    };
  }
]);
