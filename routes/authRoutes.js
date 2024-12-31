const express = require("express");
const {
  registerUser,
  login,
  getCurrentUser,
} = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/me", authenticateToken, getCurrentUser);

module.exports = router;
