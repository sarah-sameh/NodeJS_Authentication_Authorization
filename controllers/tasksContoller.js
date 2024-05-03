const Task = require("../models/Task");
const asyncHandler = require("../utilities/AsyncHandler");

exports.getTasks = asyncHandler(async (req, res, next) => {});
exports.getOneTask = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  //const slug = req.params.slug;

  const task = await Task.findById(id);
  await task.populate("user", "username");
  res.status(200).json({
    task: task,
  });
});
exports.createTask = asyncHandler(async (req, res, next) => {
  const newTask = { ...req.body, user: req.user.id };

  const task = await Task.create(newTask);
  res.json({
    success: true,
    data: task,
  });
});
exports.updateTask = (req, res, next) => {};
exports.deleteTask = (req, res, next) => {};
