const Auction = require("../models/Auction");
const Car = require("../models/Car");

exports.createAuction = async (req, res) => {
  try {
    const { carId, startingBid, endTime } = req.body;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }
    if (car.status !== "available") {
      return res
        .status(400)
        .json({ message: "Car is not available for auction." });
    }

    const auction = new Auction({
      car: carId,
      startingBid,
      endTime,
    });
    await auction.save();

    car.status = "auctioned";
    await car.save();

    res.status(201).json({ message: "Auction created successfully.", auction });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.getAuctions = async (req, res) => {
  try {
    const { status } = req.query;
    const filters = status ? { status } : {};
    const auctions = await Auction.find(filters).populate("car");
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.getAuctionDetails = async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id).populate("car bids");
    if (!auction) {
      return res.status(404).json({ message: "Auction not found." });
    }
    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.updateAuction = async (req, res) => {
  try {
    const { endTime } = req.body;
    const auction = await Auction.findByIdAndUpdate(
      req.params.id,
      { endTime },
      { new: true }
    );
    if (!auction) {
      return res.status(404).json({ message: "Auction not found." });
    }
    res.status(200).json({ message: "Auction updated successfully.", auction });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

exports.cancelAuction = async (req, res) => {
  try {
    const auction = await Auction.findByIdAndDelete(req.params.id);
    if (!auction) {
      return res.status(404).json({ message: "Auction not found." });
    }

    const car = await Car.findById(auction.car);
    car.status = "available";
    await car.save();

    res.status(200).json({ message: "Auction canceled successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};
