const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");
const { createPaymentIntent } = require("../controllers/AdminPaymentControllers");

router.post("/create-payment-intent",verifyToken,verifyAdmin, createPaymentIntent);

module.exports = router;
