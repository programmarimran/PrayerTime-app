const { usersCollection } = require("../config/collections");
const { payrollCollection,contactMessageCollection } = require("../config/collections");
const { ObjectId } = require("mongodb");

//  Get All Verified Employees (Including HRs)
const getAllVerifiedEmployees = async (req, res) => {
  try {
    const employees = await usersCollection
      .find({ role: "Employee", isVerified: true, isFired: { $ne: true } })
      .toArray();

    res.send(employees);
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};
//  Get All HR
const getAllHR = async (req, res) => {
  try {
    const employees = await usersCollection
      .find({ role: "HR", isFired: { $ne: true } })
      .toArray();

    res.send(employees);
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

//  Make HR Controller
const makeHr = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role: "HR" } }
    );

    res.send({ message: "Employee promoted to HR", result });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

//  Fire Employee Controller
const fireEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isFired: true } }
    );

    res.send({ message: "Employee has been fired", result });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

//  Adjust Salary Controller (Only Allow Increase)
const adjustSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const { newSalary } = req.body;

    const employee = await usersCollection.findOne({ _id: new ObjectId(id) });

    if (!employee) {
      return res.status(404).send({ message: "Employee not found" });
    }

    if (newSalary <= employee.salary) {
      return res
        .status(400)
        .send({ message: "Salary must be higher than current salary" });
    }

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { salary: newSalary } }
    );

    res.send({ message: "Salary updated successfully", result });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

// get payroll requist all
const getPayrollRequests = async (req, res) => {
  try {
    const requests = await payrollCollection
      .find()
      .sort({ isPaid: 1, year: 1, month: 1 })
      .toArray();

    res.send(requests);
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};
//pay bill /payEmployee
const payEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { transactionId } = req.body;

    const record = await payrollCollection.findOne({ _id: new ObjectId(id) });

    if (!record) {
      return res.status(404).send({ message: "Payroll record not found." });
    }

    if (record.isPaid) {
      return res.status(400).send({ message: "Payment already completed." });
    }

    //  Mock Payment Gateway Call Example (Replace with actual gateway logic)

    const paymentDate = new Date().toISOString();
    const updateResult = await payrollCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          isPaid: true,
          transactionId,
          paymentDate,
        },
      }
    );

    res.send({
      message: "Payment Successful",
      transactionId,
      paymentDate,
      updateResult,
    });
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

// routes/adminRoutes.js or controller/adminController.js

const getAdminDashboardStats = async (req, res) => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
    const currentYear = currentDate.getFullYear();

    const totalEmployees = await usersCollection.countDocuments();
    const pendingPayments = await payrollCollection.countDocuments({
      isPaid: false,
    });
    const unreadMessage = await contactMessageCollection.countDocuments({
      read: false,
    });
    const monthlyPayroll = await payrollCollection.countDocuments({
      month: currentMonth,
      year: currentYear,
    });
    const totalDepartments = 3;

    res.send({
      totalEmployees,
      pendingPayments,
      monthlyPayroll,
      unreadMessage,
      totalDepartments,
    });
  } catch (error) {
    res.status(500).send({ error: "Failed to load dashboard stats." });
  }
};

module.exports = {
  getAllVerifiedEmployees,
  makeHr,
  fireEmployee,
  adjustSalary,
  getAllHR,
  getPayrollRequests,
  payEmployee,
  getAdminDashboardStats,
};
