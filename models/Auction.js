const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  startingBid: { type: Number, required: true },
  currentBid: { type: Number, default: 0 },
  endTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ["ongoing", "ended", "canceled"],
    default: "ongoing",
  },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
});

module.exports = mongoose.model("Auction", auctionSchema);
