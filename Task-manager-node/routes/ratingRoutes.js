
const express = require("express");
const router = express.Router();

const Rating = require("../models/Rating");
const authMiddleware = require("../middleware/authMiddleware");

// Submit a rating
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { rating, feedback } = req.body;

    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    if (
      feedback !== undefined &&
      typeof feedback !== "string"
    ) {
      return res.status(400).json({
        message: "Feedback must be text",
      });
    }

    const newRating = await Rating.create({
      userId: req.userId,
      rating,
      feedback: feedback ? feedback.trim() : "",
    });

    return res.status(201).json({
      message: "Rating submitted successfully",
      rating: newRating,
    });
  } catch (error) {
    console.error("Submit rating error:", error);

    return res.status(500).json({
      message: "Failed to submit rating",
    });
  }
});

// Get ratings submitted by the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const ratings = await Rating.find({
      userId: req.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json(ratings);
  } catch (error) {
    console.error("Fetch ratings error:", error);

    return res.status(500).json({
      message: "Failed to fetch ratings",
    });
  }
});

module.exports = router;
