const express = require("express");
const router = express.Router();
const { getPrayerTime } = require("../controllers/prayerController");

router.get("/", getPrayerTime);

module.exports = router;
