
const express = require("express");
const router = express.Router();

const Settings = require("../models/Settings");
const authMiddleware = require("../middleware/authMiddleware");

// GET logged-in user's settings
router.get("/", authMiddleware, async (req, res) => {
  try {
    let settings = await Settings.findOne({
      userId: req.userId
    });

    if (!settings) {
      settings = await Settings.create({
        userId: req.userId
      });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get settings",
      error: error.message
    });
  }
});

// SAVE logged-in user's settings
router.put("/", authMiddleware, async (req, res) => {
  try {
    const {
      appearance,
      sound,
      notifications,
      compactMode,
      language,
      timeFormat
    } = req.body;

    const settings = await Settings.findOneAndUpdate(
      { userId: req.userId },
      {
        $set: {
          appearance,
          sound,
          notifications,
          compactMode,
          language,
          timeFormat
        },
        $setOnInsert: {
          userId: req.userId
        }
      },
      {
       returnDocument: "after",
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );

    res.json({
      message: "Settings saved successfully",
      settings
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to save settings",
      error: error.message
    });
  }
});

module.exports = router;
