require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { seedDatabase, wipeAndReseed } = require("./utils/seed");

// Import routes
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const orderRoutes = require("./routes/orders");
const analyticsRoutes = require("./routes/analytics");
const auth = require("./middleware/auth");
const admin = require("./middleware/admin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get("/api/", (req, res) => {
  res.json({ message: "Welcome to Core Academy API" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);
// Wipe all data and reseed

app.post("/api/wipe", auth, admin, async (req, res) => {
  try {
    const result = await wipeAndReseed();
    res.json({
      message: "Database wiped and reseeded successfully",
      ...result,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to wipe and reseed database" });
  }
});

// Start server only if not in test mode and not being required as a module
if (process.env.NODE_ENV !== "test" && require.main === module) {
  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    // MongoDB Connection
    mongoose
      .connect(
        process.env.MONGODB_URI || "mongodb://localhost:27017/core-academy"
      )
      .then(async () => {
        console.log("Connected to MongoDB");
        await seedDatabase();
      })
      .catch((err) => console.error("MongoDB connection error:", err));
  });
}

module.exports = app;
