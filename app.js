require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const carRoutes = require("./routes/carRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/cars", carRoutes);

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
