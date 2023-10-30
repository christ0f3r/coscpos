const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next(); // Move to the next middleware or route handler
  };
  
  module.exports = logger;
  