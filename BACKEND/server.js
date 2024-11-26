const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/auth");  // Correct import of authRoutes
const nodemailer = require("nodemailer");
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const reviewsRouter = require('./routes/reviews');

dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Database connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mern")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use Routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api", userRoutes);
app.use('/reviews', reviewsRouter);
// Correct usage of authRoutes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;  // Export for testing purposes


















