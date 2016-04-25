angular.module('canteen.messageFactory', [])

.factory('messageFactory', [
  '$http',
  'timeHelper',
  function ($http, timeHelper) {
    function getMessages(tripId) {
      return $http({
        method: 'GET',
        url: '/api/messages/' + tripId
      })
      .then(function (resp) {
        if (Array.isArray(resp.data)) {
          resp.data.map(function (msg) {
            msg.displayTime = timeHelper.convertTime(msg.createdAt);
            return msg;
          });
          return resp.data;
        }
      })
      .catch(function (err) {
        console.error(err);
      });
    }

    function addMessage(message, tripId) {
      return $http({
        method: 'POST',
        url: '/api/messages/' + tripId,
        data: message
      })
      .then(function (resp) {
        return resp.data;
      })
      .catch(function (err) {
        console.error(err);
      });
    }

    return {
      getMessages: getMessages,
      addMessage: addMessage
    };
  }
]);
