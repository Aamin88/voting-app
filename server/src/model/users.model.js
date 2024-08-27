const { model, Schema } = require("mongoose");

// TODO: add a name field
//  => {name: String, requiredL true}
// TODO: add a role field
// => role: { type: String, enum: ['admin', 'voter'], required: true }
// => organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation' },

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    organisation: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    acceptTerms: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Users", userSchema);
