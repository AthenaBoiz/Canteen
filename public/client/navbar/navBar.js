angular.module('canteen.navBar', [])

.controller('navBar', [
  '$scope',
  '$location',
  'authFactory',
  function ($scope, $location, authFactory) {
    $scope.location = $location.path();

    $scope.logOut = function () {
      // After session has been destroyed, redirect to landing page
      // and refresh page to ensure 'logout' option in navbar disappears
      authFactory.endSession()
        .then(function(data) {
          $location.path('/#/landing-page');
        });
      window.location.reload(true);
    };
  },
]);
