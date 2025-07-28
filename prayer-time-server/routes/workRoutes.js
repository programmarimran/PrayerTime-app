const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const verifyEmploy = require("../middlewares/verifyEmploy");

const {
  getWorks,
  addWork,
  updateWork,
  deleteWork,
} = require("../controllers/workController");
const {
  getPaymentHistoryByEmail,
} = require("../controllers/paymentController");

router.get("/", verifyToken, verifyEmploy, getWorks);
router.post("/", verifyToken, verifyEmploy, addWork);
router.patch("/:id", verifyToken, verifyEmploy, updateWork);
router.delete("/:id", verifyToken, verifyEmploy, deleteWork);
router.get(
  "/payment-history/:email",
  verifyToken,
  verifyEmploy,
  getPaymentHistoryByEmail
);
module.exports = router;
