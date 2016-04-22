angular.module('canteen.userTrips', [])

.factory('userTrips', [
  '$http',
  function($http) {

    var getTrips = function() {
      return $http({
        method: 'GET',
        url: '/api/trips'
      })
      .then(function(res) {
        return res.data;
      })
      .catch(function(err) {
        console.error(err);
      });
    };

    var poulateTrips = function(data) {
      var tripsArr = [];
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
      return tripsArr;
    };

    return {
      getTrips: getTrips,
      poulateTrips: poulateTrips
    };
  }
]);
