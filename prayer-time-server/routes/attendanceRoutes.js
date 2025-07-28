const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  postAttendance,
  getMyAttendance,
} = require("../controllers/attendanceController");

router.post("/",verifyToken, postAttendance);
router.get("/my",verifyToken, getMyAttendance);
module.exports = router;
