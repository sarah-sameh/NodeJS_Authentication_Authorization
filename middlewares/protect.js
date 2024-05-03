const jwt = require("jsonwebtoken");
const CustomeAPIError = require("../utilities/errors/CustomeAPIError");
function protect(req, res, next) {
  if (!req.headers.authorization) {
    next(new CustomeAPIError("Not Authorized", 401));
  }
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.SECRET_KEY);

  req.user = user;

  console.log(req.user);

  next();
}

module.exports = protect;
