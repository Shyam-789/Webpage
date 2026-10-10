
const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    appearance: {
      type: String,
      enum: ["light", "dark"],
      default: "dark"
    },

    sound: {
      type: Boolean,
      default: true
    },

    notifications: {
      type: Boolean,
      default: true
    },

    compactMode: {
      type: Boolean,
      default: false
    },

    language: {
      type: String,
      enum: ["English", "বাংলা", "हिन्दी"],
      default: "English"
    },

    timeFormat: {
      type: String,
      enum: ["12-hour", "24-hour"],
      default: "12-hour"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Settings", settingsSchema);
