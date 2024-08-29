const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  // origin: (origin, callback) => {
  //   if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("blocked by cors"));
  //   }
  // },
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

module.exports = corsOptions;
