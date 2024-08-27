const express = require("express");
const router = express.Router();
const electionsController = require("../../controllers/elections.controller");

router
  .route("/")
  .post(electionsController.addElection)
  .get(electionsController.getAllElections);

router
  .route("/:id")
  .get(electionsController.getElection)
  .put(electionsController.updateElection)
  .delete(electionsController.removeElection);

module.exports = router;
