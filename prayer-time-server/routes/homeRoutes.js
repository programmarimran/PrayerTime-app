const express = require("express");
const router = express.Router();
const { getHomePageData } = require("../controllers/homeController");

router.get("/", getHomePageData);

module.exports = router;
