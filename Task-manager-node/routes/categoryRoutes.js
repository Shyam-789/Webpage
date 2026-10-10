const express = require("express");
const Category = require("../models/Category");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET all categories
router.get("/", authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find({
      userId: req.userId
    }).sort({ createdAt: -1 });

    res.json(categories);
  } catch (error) {
    console.error("GET CATEGORIES ERROR:", error);

    res.status(500).json({
      message: "Unable to load categories"
    });
  }
});

// POST create category
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required"
      });
    }

    const category = await Category.create({
      name: name.trim(),
      userId: req.userId
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);

    res.status(500).json({
      message: "Unable to create category"
    });
  }
});

// PUT update category
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required"
      });
    }

    const category = await Category.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId
      },
      {
        name: name.trim()
      },
      {
        returnDocument: "after"
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.json(category);
  } catch (error) {
    console.error("UPDATE CATEGORY ERROR:", error);

    res.status(500).json({
      message: "Unable to update category"
    });
  }
});

// DELETE category
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.json({
      message: "Category deleted successfully"
    });
  } catch (error) {
    console.error("DELETE CATEGORY ERROR:", error);

    res.status(500).json({
      message: "Unable to delete category"
    });
  }
});

module.exports = router;