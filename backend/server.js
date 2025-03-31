require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

// Validate critical environment variables first
const requiredEnvVars = ['MONGODB_URI', 'PORT'];
requiredEnvVars.forEach(env => {
  if (!process.env[env]) {
    console.error(`❌ Missing required environment variable: ${env}`);
    process.exit(1);
  }
});

const app = express();

// Enhanced CORS with security headers
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Security middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

// Database connection with retry logic
const connectDB = async (retries = 3) => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });
    console.log('✅ MongoDB connected successfully');

    // Index handling - only in development
    if (process.env.NODE_ENV === 'development') {
      const User = require('./models/User');
      await User.syncIndexes({ background: true });
      console.log('🔄 Indexes synchronized');
    }
  } catch (err) {
    console.error(`❌ MongoDB connection error (${retries} retries left):`, err.message);
    if (retries > 0) {
      await new Promise(res => setTimeout(res, 2000));
      return connectDB(retries - 1);
    }
    process.exit(1);
  }
};

// Route imports
const routes = [
  { path: "/api/auth", router: require("./routes/authRoutes") },
  { path: "/api/courses", router: require("./routes/courseRoutes") },
  { path: "/api/mentorships", router: require("./routes/mentorshipRoutes") },
  { path: "/api/donations", router: require("./routes/donationRoutes") }
];

// Register routes with versioning
routes.forEach(route => {
  app.use(route.path, route.router);
  console.log(`🛣️  Route mounted: ${route.path}`);
});

// Production frontend serving
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
  console.log('🏗️  Production frontend configured');
}

// Enhanced error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";
  
  console.error(`[${new Date().toISOString()}] ${statusCode} - ${err.message}`, {
    path: req.path,
    stack: isProduction ? undefined : err.stack
  });

  res.status(statusCode).json({
    success: false,
    message: isProduction && statusCode === 500 ? 'Internal Server Error' : err.message,
    ...(!isProduction && { stack: err.stack })
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('💤 Process terminated');
    process.exit(0);
  });
});

// Start server with connection retries
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (err) {
    console.error('💥 Failed to start server:', err);
    process.exit(1);
  }
};

startServer();