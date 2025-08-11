const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String],
  projects: [{ title: String, description: String, link: String }],
  github: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("userProfile", profileSchema);
