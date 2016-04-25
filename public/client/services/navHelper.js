angular.module('canteen.navHelper', [])

.factory('authFactory', [
  '$http',
  function($http) {

    var userObj = {};

    function setUser () {
<<<<<<< HEAD
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
=======
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
>>>>>>> refactor set user
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

    return {
      setUser: setUser,
      endSession: endSession,
      userObj: userObj
    };
  },
]);
