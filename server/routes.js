var tripsController = require('./trips/tripsController');
var taskController = require('./tasks/taskController.js');
var userController = require('./users/userController');
var messagesController = require('./messages/messagesController');
var Purest = require('purest');
var aws = require('aws-sdk');
// var config = require('./.config/.secrets.json');
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || require('./.config/.secrets.json')['aws']['AWS_ACCESS_KEY'];
var AWS_SECRET_ACCESS = process.env.AWS_SECRET_ACCESS || require('./.config/.secrets.json')['aws']['AWS_SECRET_ACCESS'];
var S3_BUCKET_NAME = process.env.S3_BUCKET_NAME || require('./.config/.secrets.json')['aws']['S3_BUCKET_NAME'];

var google = new Purest({ provider: 'google' });

/* Utilities */
// handle errors and send response
var sendResponse = function(res, err, data, status) {
  if (err) {
    res.status(400).send('Error: Record doesn\'t exist');
  } else {
    res.status(status).send(data);
  }
};

// check current session
var checkUser = function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    console.log("no user");
    res.send({ _id: false });
  }
};

module.exports = function(app) {

  app.route('/api/email/user:email')
    .get(function(req, res) {
      userController.findByEmail(req.params.email, function(err, user) {
        sendResponse(res, err, user, 200);
      });
    });

  /* All User's Info */
  app.route('/api/user/:userId', checkUser)
    .get(function(req, res) {
      userController.getUser(req.params.userId, function(err, user) {
        if (!user) {
          res.redirect('/#/landing-page')
        } else {
          tripsController.getAllUserTrips(user.email, function(err, trips) {
            sendResponse(res, err, {
              user: user,
              trips: trips
            }, 200);
          });
        }
      });
    })
    .put(checkUser, function(req, res) {
      userController.updateUser(req.params.userId, req.body, function(err, data) {
        sendResponse(res, err, data, 201);
      });
    });

  /* Set User */
  app.route('/api/setuser', checkUser)
    .get(checkUser, function(req, res) {
      var userObj = {};
      if (req.session.user) {
        userObj.userId = req.session.user.id;
        userController.getUser(req.session.user.id, function(err, user) {
          if (user) {
            userObj.email = user.email;
          }
          res.send(200, userObj);
        });
      }
    });

  /* Single Trip Routes */
  app.route('/api/trip/:tripId', checkUser)
    .get(function(req, res) {
      tripsController.getTrip(req.params.tripId, function(err, data) {
        sendResponse(res, err, data, 200);
      });
    });

  app.route('/api/trip', checkUser)
    .post(checkUser, function(req, res) {
      tripsController.createTrip(req, function(err, data) {
        req.session.user.trip = data._id;
        userController.addTrip(req.session.user.id, data._id, function(err, stuff) {
          sendResponse(res, err, data, 201);
        });
      });
    })

  app.route('/api/trip/delete/:tripId')
    .delete(function(req, res) {
      tripsController.deleteTrip(req, function(err, data) {
        sendResponse(res, err, data, 204);
      });

    });
    // .put(checkUser, function(req, res) {
    //   tripsController.updateTrip(req, function(err, data) {
    //     sendResponse(res, err, data, 200);
    //   });
    // });

  app.route('/api/trip/update')
    .put(function(req, res) {
      tripsController.updateTrip(req, function(err, data) {
        sendResponse(res, err, data, 200);
      });
    });

  /* Task Routes */
  // app.route('/api/tasks/add/:tripId')
  //   .post(checkUser, function(req, res) {
  //     tripsController.addTask(req, function(err, data) {
  //       sendResponse(res, err, data, 201);
  //     });
  //   });
  app.route('/api/tasks/getAll:tripId', checkUser)
    .get(function(req, res) {
      taskController.getAllTasks(req, function(err, data) {
        sendResponse(res, err, data, 200);
      });
    });

  app.route('/api/task/update2')
    .put(function(req, res) {
      taskController.updateTask(req, function(err, data) {
        sendResponse(res, err, data, 200);
      });
    });

  app.route('/api/task/add/:tripId')
    .post(function(req, res) {
      taskController.addTask(req, function(err, data) {
        sendResponse(res, err, data, 200);
      });
    });

  app.route('/api/task/delete/:taskId')
    .delete(function(req, res) {
      taskController.deleteTask(req, function(err, data) {
        sendResponse(res, err, data, 200);
      })
    })

  /* Message Routes */
  app.route('/api/messages/:tripId')
    .get(checkUser, function(req, res) {
      messagesController.getMessages(req, function(err, data) {
        sendResponse(res, err, data, 200);
      });
    })
    .post(checkUser, function(req, res) {
      messagesController.addMessage(req, function(err, data) {
        sendResponse(res, err, data, 201);
      });
    });

  /* OAuth Route */
  // parses out query data from google using Purest (see above)
  app.route('/callback')
    .get(function(req, res) {
      google.get('https://www.googleapis.com/oauth2/v2/userinfo?alt=json', {
        auth: { bearer: req.session.grant.response.access_token },
      }, function(err, nope, body) {
        //find or creates the user
        userController.createUser(body, function(err, user) {
          // set session user to returned record
          req.session.user = user;

          res.redirect('/#/user/' + user.id);
        });
      });
    });
  /* Logout Route */
  app.route('/logout')
    .get(function(req, res) {
      req.session.destroy(function(err) {
        console.log('here - ', req.session);
        sendResponse(res, err, {}, 200);
      });
    });

  // app.route('/sign_s3')
  //   .get(checkUser, function(req, res) {
  //     var file_extension = req.query.file_name.split('.')[1];
  //     aws.config.update({ accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_ACCESS });
  //     var s3 = new aws.S3();
  //     var s3_params = {
  //       Bucket: S3_BUCKET_NAME,
  //       Key: req.session.user.id + '.' + file_extension,
  //       Expires: 60,
  //       ContentType: req.query.file_type,
  //       ACL: 'public-read-write'
  //     };
  //     s3.getSignedUrl('putObject', s3_params, function(err, data) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         var return_data = {
  //           signed_request: data,
  //           url: 'https://' + S3_BUCKET_NAME + '.s3.amazonaws.com/' + req.session.user.id + '.' + file_extension
  //         };
  //         sendResponse(res, err, return_data, 200);
  //       }
  //     });
  //   });

  app.route('/sign_s3')
    .get(checkUser, function(req, res) {
      aws.config.update({ accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_ACCESS });
      var s3 = new aws.S3();
      var s3_params = {
        Bucket: S3_BUCKET_NAME,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read-write'
      };
      s3.getSignedUrl('putObject', s3_params, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          var return_data = {
            signed_request: data,
            url: 'https://' + S3_BUCKET_NAME + '.s3.amazonaws.com/' + req.query.file_name
          };
          sendResponse(res, err, return_data, 200);
        }
      });
    });
};
