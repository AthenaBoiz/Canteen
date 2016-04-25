angular.module('canteen.tripMessages', [])

.controller('tripMessages', [
  '$scope',
  'messageFactory',
  'timeHelper',
  'socket',
  function ($scope, messageFactory, timeHelper, socket) {
    $scope.messageForm = {};
    $scope.messages = [];

    $scope.submitMessage = function (isValid) {
      if (isValid) {
        messageFactory.addMessage($scope.messageForm, $scope.trip._id)
        .then(function (msg) {
          // emit message via socket
          socket.emit('message:send', msg);
          $scope.messageForm = {};
        });
      }
    };

    // set up listener on socket to receive new messages,
    // if message.tripId === scope.tripId, push it to messages list
    socket.on('message:broadcast', function(msg) {
      if (msg.trip_id === $scope.trip._id) {

        // convert msg.createdAt to proper time zone, etc.

        $scope.messages.push({
          username: msg.username,
          message: msg.message,
          createdAt: msg.createdAt,
          image_url: msg.image_url,
          displayTime: timeHelper.convertTime(msg.createdAt)
        });
      }
    });

    // update time zone etc. in messageFactory
    $scope.$watch('trip', function() {
      if ($scope.trip) {
        messageFactory.getMessages($scope.trip._id)
        .then(function (messages) {
          $scope.messages = messages;
        });
      }
    });
  }
]);
