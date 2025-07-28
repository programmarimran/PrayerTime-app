const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin=require("../middlewares/verifyAdmin")
const {
  getAllHR,
  getAllVerifiedEmployees,
  makeHr,
  fireEmployee,
  adjustSalary,
  getPayrollRequests,
  payEmployee,
  getAdminDashboardStats
} = require("../controllers/adminController");
router.get("/all-verified-employees",verifyToken,verifyAdmin, getAllVerifiedEmployees);
router.get("/all-hr",verifyToken,verifyAdmin, getAllHR);
router.patch("/make-hr/:id",verifyToken,verifyAdmin, makeHr);
router.patch("/fire-employee/:id",verifyToken,verifyAdmin, fireEmployee);
router.patch("/adjust-salary/:id",verifyToken,verifyAdmin, adjustSalary);
router.get("/payroll-requests",verifyToken,verifyAdmin, getPayrollRequests);
router.patch("/pay-employee/:id",verifyToken,verifyAdmin, payEmployee);
router.get("/dashboard-stats",verifyToken,verifyAdmin, getAdminDashboardStats);

module.exports = router;
