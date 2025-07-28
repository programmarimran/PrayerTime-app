const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const verifyHR = require("../middlewares/verifyHR");
const {
  getEmployees,
  updateEmployeeVerify,
  addPayrollRequest,
  getEmployeeDetails,
  getProgressRecords,
  getHrDashboardSummary
} = require("../controllers/hrController");

router.get("/employees", verifyToken, verifyHR, getEmployees);
router.patch(
  "/employee-verify/:id",
  verifyToken,
  verifyHR,
  updateEmployeeVerify
);
router.post("/payroll", verifyToken, verifyHR, addPayrollRequest);
router.get("/employees/:slug",verifyToken,verifyHR, getEmployeeDetails);
router.get("/progress", verifyToken, verifyHR, getProgressRecords);
router.get("/dashboard/summary",verifyToken,verifyHR, getHrDashboardSummary);
module.exports = router;
