// Centralized Express error-handling middleware
// Usage: app.use(errorHandler);

function errorHandler(err, req, res, next) {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
}

module.exports = errorHandler;
