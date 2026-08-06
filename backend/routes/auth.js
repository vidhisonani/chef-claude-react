const express = require("express");
const router = express.Router();
const passport = require("passport");
const { googleCallback, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failed" }),
  googleCallback
);

router.get("/failed", (req, res) => {
  res.status(401).json({ error: "Google login failed!" });
});

router.get("/me", protect, getMe);

module.exports = router;