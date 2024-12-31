require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const carRoutes = require("./routes/carRoutes");
const authRoutes = require("./routes/authRoutes");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const auctionRoutes = require("./routes/auction");
const paymentRoutes = require("./routes/payment");

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auctions", auctionRoutes);
app.use("/api/payments", paymentRoutes);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI is not defined in the .env file");
}

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("newBid", (bid) => {
    io.emit("bidUpdate", bid);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);

const PORT = process.env.PORT || 3000;

app
  .listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  )
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use.`);
      process.exit(1);
    } else {
      console.error(err);
    }
  });
