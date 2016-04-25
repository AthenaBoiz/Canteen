angular.module('canteen.trip', ['xeditable'])

.controller('tripCtrl', [
  '$scope',
  'trip',
  'NgMap',
  '$stateParams',
  '$location',
  '$state',
  'authFactory',
  function ($scope, trip, NgMap, $stateParams, $location, $state, authFactory) {
    $scope.trip = null;

    $scope.invitedUser = false;

    $scope.notUser = false;
    $scope.currentUser = null;
    $scope.loggedIn = false;

    authFactory.setUser()
      .then(function(user) {
        if (user.userId) {
          $scope.currentUser = user;
          $scope.loggedIn = true;
        }
      });

    $scope.checkForUser = function(email) {
      trip.checkForUser(email)
        .then(function(user) {
          if (user.data) {
            $state.go('userView', { userId: user.data.id });
          } else {
            $scope.notUser = true;
            setTimeout(function() {
              $scope.notUser = false;
              $scope.$apply();
            }, 2200)
          }
        });
    };

     $scope.updateTrip = function(Trip){
        console.log(Trip)
        trip.updateTrip(Trip);
     };

     $scope.deleteTrip = function(Trip){
      console.log(Trip._id)
      trip.deleteTrip(Trip._id)
      .then(function(data){
        if(data){

        }
        $state.go('userView', { userId: $scope.currentUser.userId });
      })
     };

    trip.getTrip($stateParams.tripId)
    .then(function (tripData) {
      $scope.trip = tripData;
      $scope.dates = {
        start: moment($scope.trip.dates.start).format('MMM Do, YYYY'),
        end: moment($scope.trip.dates.end).format('MMM Do, YYYY')
      };
      if ($scope.currentUser) {
        var members = [];
        tripData.members.forEach(function(member) {
          members.push(member.email);
        });

        // console.log($scope.currentUser.email);
        if (members.indexOf($scope.currentUser.email) !== -1) {
          $scope.invitedUser = true;
        }
      }
    });

    $scope.color = {
      colors: ['red', 'blue', 'purple', 'green', 'orange'],
    };
  },
]);
