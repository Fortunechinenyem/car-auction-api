const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  images: [String],
  status: {
    type: String,
    enum: ["pending", "approved", "sold"],
    default: "pending",
  },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Car", carSchema);
