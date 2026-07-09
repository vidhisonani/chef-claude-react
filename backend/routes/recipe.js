const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { generateRecipe } = require("../controllers/recipeController");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many requests! Please wait a few minutes. 🍳" },
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(limiter);
router.post("/", generateRecipe);

module.exports = router;