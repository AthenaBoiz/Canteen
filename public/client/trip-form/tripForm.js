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
    $scope.userId = null;
    $scope.loggedIn = false;

    authFactory.setUser()
      .then(function(user) {
        if (user.userId) {
          $scope.userId = user.userId;
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
      .then(function(data) {
        $state.go('userView', { userId: $scope.userId });
      });
    };
  }
]);
