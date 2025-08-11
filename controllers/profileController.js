const UserProfile = require("../models/userProfile");

exports.createProfile = async (req, res) => {
  try {
    const existing = await UserProfile.findOne({ userId: req.user._id });
    if (existing) return res.status(400).json({ message: "Profile already exists" });

    const profile = await UserProfile.create({ ...req.body, userId: req.user._id });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user._id });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user._id },
      req.body,
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
