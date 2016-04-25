angular.module('canteen', [
  'canteen.landingPage',
  'canteen.forms',
  'canteen.navHelper',
  'canteen.tripData',
  'canteen.messageFactory',
  'canteen.navBar',
  'canteen.taskForm',
  'canteen.taskView',
  'canteen.trip',
  'canteen.tripForm',
  'canteen.user',
  'canteen.userTrips',
  'canteen.tripMessages',
  'canteen.socketFactory',
  'canteen.timeHelper',
  'canteen.awsService',
  'canteen.directives',
  'btford.socket-io',
  'ngMap',
  'ui.bootstrap',
  'ui.router',
  'xeditable'
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
    .state('userView', {
      url: '/user/:userId',
      templateUrl: 'client/user/userView.html',
      controller: 'userCtrl'
    });
});
