const { usersCollection } = require("../config/collections");
const { payrollCollection } = require("../config/collections");
const {
  workCollection,
  attendanceCollection,
  employeeCollection,
} = require("../config/collections");

const { ObjectId } = require("mongodb");

const getEmployees = async (req, res) => {
  try {
    const employees = await usersCollection
      .find({ role: "Employee" })
      .toArray();

    res.send(employees);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to fetch employees", error: error.message });
  }
};
//employ isVerify toggle
const updateEmployeeVerify = async (req, res) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isVerified } }
    );

    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Failed to update verification status",
      error: error.message,
    });
  }
};
//monthly payment data save
const addPayrollRequest = async (req, res) => {
  try {
    const payrollData = req.body;
    const { employeeEmail, month, year } = payrollData;

    if (!employeeEmail || !month || !year) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const exists = await payrollCollection.findOne({
      employeeEmail: employeeEmail,
      month: month,
      year: year,
    });

    if (exists) {
      return res
        .status(409)
        .json({ message: "Payroll already exists for this month and year" });
    }

    const result = await payrollCollection.insertOne(payrollData);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error adding payroll request:", error);
    res.status(500).json({
      message: "Failed to create payroll request",
      error: error.message,
    });
  }
};

// specific employ payment details
const getEmployeeDetails = async (req, res) => {
  try {
    const { slug } = req.params;

    let employee;
    if (ObjectId.isValid(slug)) {
      employee = await usersCollection.findOne({ _id: new ObjectId(slug) });
    } else {
      employee = await usersCollection.findOne({
        $or: [{ email: slug }, { uid: slug }],
      });
    }

    if (!employee) {
      return res.status(404).send({ message: "Employee not found" });
    }

    const payments = await payrollCollection
      .find({ employeeEmail: employee.email })
      .sort({ year: 1, month: 1 })
      .toArray();

    res.send({ employee, payments });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};

//progress all emloy records
const getProgressRecords = async (req, res) => {
  try {
    const { employee, month } = req.query;

    const query = {};
    if (employee) query.email = employee;
    if (month) query.month = parseInt(month);
    // const query={employeeEmail:employee,month:parseInt(month)}

    const records = await workCollection.find(query).toArray();

    res.send(records);
  } catch (error) {
    res.status(500).send({ message: "Server Error", error: error.message });
  }
};

// controller/hrDashboardController.js
const getHrDashboardSummary = async (req, res) => {
  try {
    const verifiedEmployees = await usersCollection.countDocuments({
      isVerified: true,
      role: "Employee",
    });
    const today = new Date().toLocaleDateString();
    // console.log(today);
    const todayAttendance = await attendanceCollection.countDocuments({
      date: today,
    });

    const pendingPayrolls = await payrollCollection.countDocuments({
      isPaid: false,
    });

    const recentActivities = await workCollection
      .find()
      .sort({
        submittedAt: -1,
      })
      .limit(5)
      .toArray();

    res.send({
      verifiedEmployees,
      todayAttendance,
      pendingPayrolls,
      recentActivities,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getEmployees,
  updateEmployeeVerify,
  addPayrollRequest,
  getEmployeeDetails,
  getProgressRecords,
  getHrDashboardSummary,
};
