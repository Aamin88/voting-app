const allowedOrigin = require("../config/allowedOrigins");

const credentials = function (req, res, next) {
  const origin = req.headers.origin;

  if (allowedOrigin.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", origin); // Adjust with the allowed origin
  }
  next();
};

module.exports = credentials;
