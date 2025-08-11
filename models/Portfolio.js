const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  bio: { type: String },
  skills: [{ type: String }],
  projects: [
    {
      title: String,
      description: String,
      link: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Portfolio", PortfolioSchema);
