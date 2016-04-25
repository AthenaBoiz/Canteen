var Trip = require('./tripModel');
var mailer = require('../utils/autoEmails');
var Task = require('../tasks/taskModel.js');  //Needed to delete all trip tasks when deleting a trip

module.exports = {

  // search current trip for matching email in members array
  searchTripsForUser: function(email, next) {
    Trip.findOne({ 'members.email': email })
      .exec(function(err, trip) {
        next(err, trip);
      });
  },

  //search for and return all trips with a particular users email in members
  getAllUserTrips: function(email, next) {
    Trip.find({ 'members.email': email })
      .exec(function(err, trips) {
        next(err, trips);
      });
  },

  // create a trip
  createTrip: function(req, next) {
    // Add current user to trip members
    req.body.members.push({ email: req.session.user.email });
    Trip.create(req.body, function (err, trip) {
      mailer.addedToTripMsg(trip);
      next(err, trip);
    });
  },

  // update trip
  updateTrip: function(req, next) {
    var options = { new: true };
    Trip.findByIdAndUpdate(req.body._id, req.body, options)
      .exec(function(err, trip) {
        next(err, trip);
      });
  },

  // get trip by ID
  getTrip: function(tripId, next) {
    Trip.findOne({ _id: tripId })
      .exec(function(err, trip) {
        next(err, trip);
      });
  },

  // delete a trip and all tasks by ID
  deleteTrip: function(req, next) {
    var tripId = req.params.tripId;
    Trip.findByIdAndRemove(tripId)
      .exec(function(err, trip) {
        next(err, trip);
      });
  }




      // .exec(function(err, trip) {
      //   if (err) {
      //     next(err)
      //   } else {
      //     // Task.findAll({tripId: tripId})
      //     //   .remove()
      //     // have to delete all tasks
      //     next("deleted");
      //   }



      // })


  // add a task to tasks array on trip
  // addTask: function (req, next) {
  //   Trip.findByIdAndUpdate(req.params.tripId, {
  //     $push: {
  //       tasks: req.body,
  //     },
  //   },
  //   {
  //     safe: true,
  //     upsert: true,
  //   })
  //   .exec(function (err, trip) {
  //     next(err, trip);
  //   });
  // },

};
