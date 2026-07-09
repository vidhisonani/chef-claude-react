const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  ingredients: [String],
  servings: Number,
  recipe: String,
  isVeg: Boolean,
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);