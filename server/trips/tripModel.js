/* Trip Documents Schema */
var mongoose = require('mongoose');

var tripSchema = new mongoose.Schema({
  tripName: String,
  members: {
    type: Array,
    default:[],
  },
  location: String,
  dates: {
    start: Date,
    end: Date,
  }
});

module.exports = mongoose.model('Trip', tripSchema);
