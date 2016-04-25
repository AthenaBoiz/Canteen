angular.module('canteen.navHelper', [])

.factory('authFactory', [
  '$http',
  function($http) {

    var userObj = {};

    function setUser () {
      if (userObj.userId) {
        return Promise.resolve(userObj);
      } else {
        return $http({
          method: 'GET',
          url: '/api/setuser'
        })
        .then(function (resp) {
          userObj = resp.data;
          return resp.data;
        })
        .catch(function (err) {
          console.error(err);
        });
      }
    }

    function endSession () {
      return $http({
        method: 'GET',
        url: '/logout'
      })
      .then(function (resp) {
        userObj = {};
        return resp.data;
      })
      .catch(function (err) {
        console.error(err);
      });
    }

    // Factory methods return promises
    return {
      setUser: setUser,
      endSession: endSession,
      userObj: userObj
    };
  },
]);
