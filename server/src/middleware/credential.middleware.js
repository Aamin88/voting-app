const allowedOrigin = require("../config/allowedOrigins");

const credential = function (req, res, next) {
  const origin = req.headers.origin;
  console.log(req.headers.origin);

  if (allowedOrigin.includes(origin)) {
    next();
  }
};

module.exports = credential;
