const CustomeAPIError = require("../utilities/errors/CustomeAPIError");

function checkRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      next(new CustomeAPIError("not authorized!", 401));
    }
    next();
  };
}

module.exports = checkRole;
