// Middleware for undefined route handling (404)
// Usage: app.use(notFoundHandler);

function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Not Found: ${req.originalUrl}`
  });
}

module.exports = notFoundHandler;
