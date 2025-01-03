const express = require("express");
const multer = require("multer");
const {
  authenticateToken,
  authorizeRoles,
} = require("../middleware/authMiddleware");
const {
  uploadCar,
  getCars,
  getCarDetails,
  updateCar,
  deleteCar,
} = require("../controllers/carController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.array("images", 5), uploadCar);
router.get("/", getCars);
router.get("/:id", getCarDetails);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "seller"),
  updateCar
);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), deleteCar);

module.exports = router;
