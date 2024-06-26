const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("../utilities/AsyncHandler");
const CustomeAPIError = require("../utilities/errors/CustomeAPIError");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    data: users,
  });
});
exports.getOneUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    return next(new CustomeAPIError("User not found", 404));
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.register = asyncHandler(async (req, res, next) => {
  const newUser = { ...req.body };

  const user = new User(newUser);
  await user.save();

  res.status(201).json({
    status: "success",
    data: user,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    next(new CustomeAPIError("Not found", 404));
  }
  const isMatch = await bcryptjs.compare(req.body.password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    next(new CustomeAPIError("one of credtial is not valid", 400));
  }
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    secretKey,
    {
      expiresIn: "5D",
    }
  );

  res.status(200).json({
    status: "success",
    token: token,
  });
});
exports.updateUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const updatedUserData = req.body;

  const user = await User.findByIdAndUpdate(id, updatedUserData, { new: true });

  if (!user) {
    return next(new CustomeAPIError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  await User.findByIdAndDelete(id);

  res.status(204).json({
    success: true,
  });
});
