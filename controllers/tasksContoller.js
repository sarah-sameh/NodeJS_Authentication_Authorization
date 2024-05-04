const Task = require("../models/Task");
const asyncHandler = require("../utilities/AsyncHandler");

exports.getTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find().populate("user", "username");
  res.status(200).json({
    success: true,
    data: tasks,
  });
});

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
exports.updateTask = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const updatedTask = req.body;

  const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({ success: true, data: task });
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const task = await Task.findByIdAndDelete(id);

  if (!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  }

  res.json({ success: true, data: {} });
});

