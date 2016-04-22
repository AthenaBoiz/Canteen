var tripsController = require('./trips/tripsController');
var userController = require('./users/userController');
var messagesController = require('./messages/messagesController');
var Purest = require('purest');

var google = new Purest({ provider: 'google' });

/* Utilities */
// handle errors and send response
var sendResponse = function (res, err, data, status) {
  if (err) {
    res.status(400).send('Error: Record doesn\'t exist');
  } else {
    res.status(status).send(data);
  }
};

// check current session
var checkUser = function (req, res, next) {
  if (req.session.user) {
    next();
  } else {
    console.log("no user");
    res.send({_id: false});
  }
};

module.exports = function (app) {

/* All User's Trips */
  app.route('/api/trips/', checkUser)
    .get(checkUser, function(req, res) {
      tripsController.getAllUserTrips(req.session.user.email, function(err, data) {
        sendResponse(res, err, data, 200);
      });
    });

  /* Single Trip Routes */
  app.route('/api/trip/:tripId', checkUser)
    .get(checkUser, function (req, res) {
      tripsController.getTrip(req.params.tripId, function (err, data) {
        sendResponse(res, err, data, 200);
      });
    });

  app.route('/api/trip', checkUser)
    .post(checkUser, function (req, res) {
      tripsController.createTrip(req, function (err, data) {
        req.session.user.trip = data._id;
        userController.addTrip(req.session.user.id, data._id, function (err, result) {
          sendResponse(res, err, data, 201);
        });
      });
    })
    .put(checkUser, function (req, res) {
      tripsController.updateTrip(req, function (err, data) {
        sendResponse(res, err, data, 200);
      });
    });

  /* Task Routes */
  app.route('/api/tasks/add/:tripId')
    .post(checkUser, function (req, res) {
      tripsController.addTask(req, function (err, data) {
        sendResponse(res, err, data, 201);
      });
    });

  /* Message Routes */
  app.route('/api/messages/:tripId')
    .get(checkUser, function (req, res) {
      messagesController.getMessages(req, function (err, data) {
        sendResponse(res, err, data, 200);
      });
    })
    .post(checkUser, function (req, res) {
      messagesController.addMessage(req, function (err, data) {
        sendResponse(res, err, data, 201);
      });
    });

  /* OAuth Route */
  // parses out query data from google using Purest (see above)
  app.route('/callback')
    .get(function (req, res) {
      google.get('https://www.googleapis.com/oauth2/v2/userinfo?alt=json', {
        auth: { bearer: req.session.grant.response.access_token },
      }, function (err, nope, body) {
        //find or creates the user
        userController.createUser(body, function (err, user) {
          // set session user to returned record
          req.session.user = user;
          if (!user.trip) {
            // search all trips for user email in members
            tripsController.searchTripsForUser(user.email, function (err, trip) {
              if (trip === null) {
                // if no trip is found with member redirect to trip creation form
                res.redirect('/#/trip-form');
              } else {
                // set trip on both user, and on current session user object
                userController.addTrip(user.id, trip._id, function () {
                  req.session.user.trip = trip._id;
                  res.redirect('/#/trips');
                });
              }
            });
          } else {
            res.redirect('/#/trips');
          }
        });
      });
    });
    /* Logout Route */
    app.route('/logout')
    .get(function (req, res) {
      req.session.destroy(function (err) {
        if (err) {
          console.error(err);
        } else {
          res.redirect('/');
        }
      });
    });
};
