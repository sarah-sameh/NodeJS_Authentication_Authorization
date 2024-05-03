function globalErrorHandler(err, req, res, next) {
  res.status(err.statusCode || 500).json({
    status: "error",
    error: err.message,
  });
}

module.exports = globalErrorHandler;
