const express = require("express");
const router = express.Router();
const { getPrayerTime } = require("../controllers/prayerController");
const { getPrayerTimeByCoords } = require("../controllers/prayerController");

router.get("/", getPrayerTime);
router.get("/coords", getPrayerTimeByCoords);

module.exports = router;
