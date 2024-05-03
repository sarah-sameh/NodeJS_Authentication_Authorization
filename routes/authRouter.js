const router = require("express").Router();

const { register, login } = require("../controllers/usersController");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
