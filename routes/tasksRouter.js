const router = require("express").Router();

const {
  createTask,
  deleteTask,
  getOneTask,
  getTasks,
  updateTask,
} = require("../controllers/tasksContoller");

const protect = require("../middlewares/protect");
router.route("/").get(getTasks).post(protect, createTask);
router.route("/:id").get(getOneTask).patch(updateTask).delete(deleteTask);

module.exports = router;
