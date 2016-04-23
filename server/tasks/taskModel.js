var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
  tripId: String,
  taskName: String,
  description: String,
  category: String,
  assignedTo: String,
  statusCode: Number
});

// var taskSchema = new mongoose.Schema({
//   tripId: String,
//     tasks : [{
//       taskId : String,
//       task: {
//         task: String,
//         description: String,
//         category: string
//       }
//     }]
// });




module.exports = mongoose.model('Task', taskSchema);
