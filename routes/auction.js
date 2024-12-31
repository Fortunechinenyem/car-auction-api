const express = require("express");
const router = express.Router();
const {
  createAuction,
  getAuctions,
  getAuctionDetails,
  updateAuction,
  cancelAuction,
} = require("../controllers/auctionController");

router.post("/", createAuction);
router.get("/", getAuctions);
router.get("/:id", getAuctionDetails);
router.put("/:id", updateAuction);
router.delete("/:id", cancelAuction);

module.exports = router;
