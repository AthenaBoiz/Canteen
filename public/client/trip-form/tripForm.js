angular.module('canteen.tripForm', [])

.controller('tripForm', [
  '$scope',
  'formFactory',
  '$location',
  'authFactory',
  '$state',
  function ($scope, formFactory, $location, authFactory, $state) {
    $scope.tripForm = {};
    $scope.members =  [];
    $scope.tripMember = {};
    $scope.currentUser = null;
    $scope.loggedIn = false;


    authFactory.setUser()
      .then(function(user) {
        if (user.userId) {
          $scope.currentUser = user;
          $scope.loggedIn = true;
        }
      });

    $scope.addMember = function () {
      // Add trip member to array and reset field
      $scope.members.push($scope.tripMember);
      $scope.tripMember = {};
    };

    $scope.createTrip = function () {
      // Add members to form, submit form, and redirect to tripView
      $scope.tripForm.members = $scope.members;
      formFactory.submitTrip($scope.tripForm)
        .then(function(trip) {
          $state.go('tripView', { tripId: trip.data._id });
        });
    };
  }
]);
