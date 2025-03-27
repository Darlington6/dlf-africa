const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path"); // Added for production
const connectDB = require("./config/db");

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') }); // More robust path resolution

// Connect to database
connectDB();

// Initialize Express app
const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

// Middleware
app.use(express.json({ limit: '10kb' })); // Body limit
app.use(express.urlencoded({ extended: true }));

// Route imports
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const mentorshipRoutes = require("./routes/mentorshipRoutes");
const donationRoutes = require("./routes/donationRoutes");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/mentorships", mentorshipRoutes);
app.use("/api/donations", donationRoutes);

// Production setup - Serve frontend if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

// Enhanced error handling
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : err.message;
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

// Server start
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => 
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`[${new Date().toISOString()}] Unhandled Rejection:`, err.message);
  server.close(() => process.exit(1));
});