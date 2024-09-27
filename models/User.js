const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  fullname: { type: String, default: null },
  username: { type: String, default: null },
  email: { type: String, unique: true },
  mobile: { type: String, default: null },
  password: { type: String },
  token: { type: String },
  isVerified: { type: Boolean, default: false },
  creationTime: { type: Number },
});

module.exports = model("User", userSchema);
