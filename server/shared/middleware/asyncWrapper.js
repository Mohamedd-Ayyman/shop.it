// Async wrapper for route handlers to catch errors and pass to Express error handler
// Usage: asyncWrapper(fn)

const asyncWrapper = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncWrapper;
