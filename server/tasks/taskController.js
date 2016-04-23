var Task = require('./taskModel.js');

module.exports = {
  addTask: function(req, next) {
    var task = req.body;
    var newTask = {
      statusCode: task.statusCode,
      taskName: task.taskName,
      description: task.descripton,
      category: task.category,
      assignedTo: task.assignedTo.email
    }
    console.log(13, newTask)
    Task.create(newTask, function (err){
      next(err, newTask);
    });

  },

  updateTask: function(req, next) {
    var task = req.body.task
    Task.find({ tripId: req.params.tripId })
      .where('tasks._Id').equals(req.params.taskId)
      .update({ task: task.task, description: task.description, category: task.category, statusCode: task.statusCode, assignedTo: task.assignedTo }, function(err, task) {
        next(err, task);
      });
  }
}



// Using query builder
// Person.
// find({ occupation: /host/ }).
// where('name.last').equals('Ghost').
// where('age').gt(17).lt(66).
// where('likes').in(['vaporizing', 'talking']).
// limit(10).
// sort('-occupation').
// select('name occupation').
// exec(callback);
