angular.module('canteen.navBar', [])

.controller('navBar', [
  '$scope',
  '$location',
  'authFactory',
  function ($scope, $location, authFactory) {
    $scope.location = $location.path();

    // get the userId on the scope so it can be used in the navbar link
    // also set a logged in/logged out state here
    $scope.currentUser = null;
    $scope.loggedIn = false;

    authFactory.setUser()
      .then(function(user) {
        if (user.userId) {
          $scope.currentUser = user;
          $scope.loggedIn = true;
        }
      });

    $scope.logOut = function () {
      // After session has been destroyed, redirect to landing page
      // and refresh page to ensure 'logout' option in navbar disappears
      authFactory.endSession()
        .then(function(data) {
          $location.path('/#/landing-page');
          $scope.userId = null;
          $scope.loggedIn = false;
        });
    };
  }
]);
