var User = require('../users/userModel');
var Message = require('./messagesModel');

module.exports = {

  // get messages for the current trip
  getMessages: function (req, next) {
    Message.find({ trip_id: req.params.tripId })
    .exec(function (err, messages) {
      next(err, messages);
    });
  },

  // add message to chat
  addMessage: function (req, next) {
    // First, get the user by id, use user image_url when creating message
    User.findOne({ id: req.session.user.id })
    .exec(function (err, user) {
      Message.create({
        trip_id: req.params.tripId,
        username: req.session.user.given_name + ' ' + req.session.user.family_name,
        message: req.body.message,
        image_url: user.image_url
      }, function (err, message) {
        next(err, message);
      });
    });
  }

};
