require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");

const recipeRoutes = require("./routes/recipe");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.FRONTEND_URL
  ],
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.json({ message: "Chef Claude Backend is running!" });
});

// Routes
app.use("/api/recipe", recipeRoutes);
app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected!");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`\nKitchen is open on http://localhost:${PORT}`);
      console.log(`Groq key loaded: ${process.env.GROQ_API_KEY ? "Connection Established" : "Connection Failed"}\n`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = app;