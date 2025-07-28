const express = require("express");
const router = express.Router();
const { getAllDivisions, getDistrictsByDivision } = require("../controllers/locationController");

router.get("/divisions", getAllDivisions);
router.get("/divisions/:division/districts", getDistrictsByDivision);

module.exports = router;
