angular.module('canteen', [
  'canteen.landingPage',
  'canteen.forms',
  'canteen.navHelper',
  'canteen.tripData',
  'canteen.navBar',
  'canteen.taskForm',
  'canteen.taskView',
  'canteen.trip',
  'canteen.tripForm',
  'canteen.userTrips',
  'canteen.userTripsCtrl',
  'ngMap',
  'ui.bootstrap',
  'ui.router',
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/landing-page');
  $stateProvider
    .state('landingPage', {
      url: '/landing-page',
      templateUrl: 'client/landing-page/landingPage.html',
      controller: 'landingPage',
    })
    .state('tripForm', {
      url: '/trip-form',
      templateUrl: 'client/trip-form/tripForm.html',
      controller: 'tripForm'
    })
    .state('tripView', {
      url: '/trip/:tripId',
      templateUrl: 'client/trip/tripView.html',
      controller: 'tripCtrl',
    })
    .state('userTrips', {
      url: '/trips',
      templateUrl: 'client/usertrips/usertrips.html',
      controller: 'userTripsCtrl'
    });
});
