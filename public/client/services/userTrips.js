angular.module('canteen.userTrips', [])

.factory('userTrips', [
  '$http',
  function($http) {

    // might want to use user email as a parameter to return 
    // only those trips that this user is a part of (invited to)
    var getUserInfo = function(userId) {
      return $http({
        method: 'GET',
        url: '/api/user/' +  userId
      })
      .then(function(res) {
        console.log(res.data);
        return res.data;
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
      poulateTrips: poulateTrips
    };
  }
]);
