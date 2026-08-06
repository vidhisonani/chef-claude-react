const jwt = require("jsonwebtoken");

exports.googleCallback = function(req, res) {
  const token = jwt.sign(
    {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      photo: req.user.photo
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
}

exports.getMe = function(req, res) {
  res.json({ user: req.user });
}