const CustomeAPIError = require("./errors/CustomeAPIError");

const asyncHandler = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch((error) => {
    let err = null;
    if (error.message === "not found") {
      err = new CustomeAPIError(error.message, 404);
    }
    next(err);
  });
};

module.exports = asyncHandler;


