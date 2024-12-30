const Car = require("../models/Car");

exports.uploadCar = async (req, res) => {
  try {
    const car = new Car({
      ...req.body,
      images: req.files.map((file) => file.path),
    });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find(req.query).populate("seller");
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCarDetails = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate("seller");
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ error: "Car not found" });
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
