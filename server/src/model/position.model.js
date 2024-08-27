const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Election",
    required: true,
  },
  candidates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
    },
  ],
  votes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vote",
    },
  ],
});

module.exports = mongoose.model("Position", positionSchema);
