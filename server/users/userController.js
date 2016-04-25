var User = require('./userModel');

module.exports = {
  createUser: function (body, next) {
    var userData = {
      id: body.id,
      email: body.email,
      given_name: body.given_name,
      family_name: body.family_name,
    };

    // find or create user
    User.findOne({ id: body.id })
    .exec(function (err, user) {
      if (!user) {
        User.create(userData, function (err) {
          next(err, userData);
        });
      } else {
        next(err, user);
      }
    });
  },

  findByEmail: function(email, next) {
    User.findOne({ email: email })
      .exec(function(err, user) {
        next(err, user);
      });
  },

  //update users bio Info
  updateUser: function (userId, data, next) {
    User.update( { id: userId }, {
      bio: data.bio,
      favorite_trips: data.favorite_trips,
      image_url: data.image_url
    },
    function(err, data) {
      next(err, data);
    });
  },
  // add users trip._id to record for later lookup
  // this method is used in a couple methods on routes.js
  addTrip: function (userId, tripId, next) {
    User.update({ id: userId }, { $set: { trip: tripId } }, function () {
      next();
    });
  },

  getUser: function (userId, next) {
    User.findOne({ id: userId })
    .exec(function (err, user) {
      next(err, user);
    });
  }
};
