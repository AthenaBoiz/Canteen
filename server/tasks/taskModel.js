var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
  tripId: String,
  taskName: String,
  description: String,
  category: String,
  assignedTo: String,
  statusCode: Number
});

module.exports = mongoose.model('Task', taskSchema);
