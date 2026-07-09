const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  ingredients: [String],
  servings: Number,
  recipe: String,
  isVeg: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);