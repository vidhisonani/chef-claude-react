const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { generateRecipe, getHistory } = require("../controllers/recipeController");
const { protect } = require("../middleware/authMiddleware");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many requests! Please wait a few minutes. 🍳" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(limiter);
router.post("/", generateRecipe);
router.get("/history", protect, getHistory);

module.exports = router;