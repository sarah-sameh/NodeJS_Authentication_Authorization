const router = require("express").Router();

const {
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} = require("../controllers/usersController");


router.route("/").get(getUsers);
router.route("/:id").get(getOneUser).patch(updateUser).delete(deleteUser);

module.exports = router;
