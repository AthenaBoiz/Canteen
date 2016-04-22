angular.module('canteen.tripForm', [])

.controller('tripForm', [
  '$scope',
  'formFactory',
  '$location',
  function ($scope, formFactory) {
    $scope.tripForm = {};
    $scope.members =  [];
    $scope.tripMember = {};

    $scope.addMember = function () {
      // Add trip member to array and reset field
      $scope.members.push($scope.tripMember);
      $scope.tripMember = {};
    };

    $scope.createTrip = function () {
      // Add members to form, submit form, and redirect to tripView
      $scope.tripForm.members = $scope.members;
      formFactory.submitTrip($scope.tripForm)
      .then(function () {
        window.location = '/#/trips';
      });
    };
  }
]);
