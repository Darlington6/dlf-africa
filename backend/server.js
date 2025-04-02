require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

// Validate environment variables
const requiredEnvVars = ['MONGODB_URI', 'PORT', 'JWT_SECRET'];
requiredEnvVars.forEach(env => {
  if (!process.env[env]) {
    console.error(`❌ Missing required environment variable: ${env}`);
    process.exit(1);
  }
});

const app = express();

// Enhanced CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Security middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

// Debugging setup
mongoose.set('debug', process.env.NODE_ENV !== 'production');

// Database connection with enhanced logging
const connectDB = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    console.log(`Using database: ${process.env.MONGODB_URI.split('/').pop().split('?')[0]}`);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    
    db.once('open', () => {
      console.log('📊 Database state:', {
        collections: Object.keys(db.collections),
        dbName: db.name,
        models: Object.keys(mongoose.models)
      });
    });

    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

// Debug endpoint for donations
app.get('/debug/donations', async (req, res) => {
  try {
    const donations = await mongoose.connection.db.collection('donations').find().toArray();
    res.json({
      count: donations.length,
      latest: donations.slice(-3).reverse(),
      stats: await mongoose.connection.db.collection('donations').stats()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Routes
const routes = [
  { path: "/api/auth", router: require("./routes/authRoutes") },
  { path: "/api/courses", router: require("./routes/courseRoutes") },
  { path: "/api/mentorships", router: require("./routes/mentorshipRoutes") },
  { path: "/api/donations", router: require("./routes/donationRoutes") }
];

routes.forEach(route => {
  app.use(route.path, route.router);
  console.log(`🛣️  Route mounted: ${route.path}`);
});

// Production frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

// Error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`[ERROR] ${req.method} ${req.path}:`, err);
  res.status(statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 MongoDB: ${process.env.MONGODB_URI.includes('cluster') ? 'Atlas' : 'Local'}`);
    console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  });

  process.on('SIGTERM', () => {
    console.log('🛑 Shutting down gracefully...');
    server.close(() => mongoose.connection.close(false));
  });
};

startServer();