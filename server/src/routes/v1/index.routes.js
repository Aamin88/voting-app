const express = require("express");
const router = express.Router();

const electionRoute = require("./elections.routes");
const categoryRoute = require("./category.routes");
const candidatesRoute = require("./candidates.routes");
const votersRoute = require("./voters.routes");

router.use("/elections", electionRoute);
router.use("/categories", categoryRoute);
router.use("/candidates", candidatesRoute);
router.use("/voters", votersRoute);

module.exports = router;
