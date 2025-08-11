const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Portfolio = require("../models/Portfolio");

// Create portfolio
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("🔹 Incoming body:", req.body);
    console.log("🔹 User from token:", req.user);

    if (!req.user?.id) {
      return res.status(400).json({ success: false, message: "User ID missing" });
    }

    const existing = await Portfolio.findOne({ user: req.user.id });
    if (existing) {
      return res.status(400).json({ success: false, message: "Portfolio already exists" });
    }

    const portfolio = new Portfolio({ user: req.user.id, ...req.body });
    await portfolio.save();

    res.status(201).json({
      success: true,
      message: "Portfolio created successfully",
      data: portfolio
    });
  } catch (err) {
    console.error("❌ Error creating portfolio:", err);
    res.status(500).json({ success: false, message: "Failed to create portfolio", error: err.message });
  }
});
router.get("/", authMiddleware, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ message: "No portfolio found" });
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/", authMiddleware, async (req, res) => {
  try {
    console.log("Updating portfolio for user:", req.user.id);

    const portfolio = await Portfolio.findOneAndUpdate(
      { user: req.user.id }, // find by logged-in user
      req.body,              // new data
      { new: true }          // return updated document
    );

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found"
      });
    }

    res.json({
      success: true,
      message: "Portfolio updated successfully",
      data: portfolio
    });
  } catch (err) {
    console.error("Error updating portfolio:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message
    });
  }
});

module.exports = router;
