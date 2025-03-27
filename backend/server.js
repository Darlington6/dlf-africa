const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Initialize app
const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true
}));

// Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Database connection with safe index handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10
    });
    console.log('MongoDB connected successfully');

    // Safe index synchronization
    if (process.env.NODE_ENV !== 'production') {
      const User = require('./models/User');
      await User.syncIndexes({ background: true });
      console.log('Indexes synchronized safely');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const mentorshipRoutes = require("./routes/mentorshipRoutes");
const donationRoutes = require("./routes/donationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/mentorships", mentorshipRoutes);
app.use("/api/donations", donationRoutes);

// Production setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.message);
  
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : err.message;
  
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  process.on("unhandledRejection", (err) => {
    console.error(`[${new Date().toISOString()}] Unhandled Rejection:`, err.message);
    server.close(() => process.exit(1));
  });
};

startServer();