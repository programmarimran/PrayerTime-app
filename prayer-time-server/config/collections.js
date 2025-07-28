const { client } = require("./db");

const database = client.db("workSyncDB");

const usersCollection = database.collection("users");
const workCollection = database.collection("workSheet");
const payrollCollection = database.collection("payroll");
const employeeCollection = database.collection("employees");
const contactMessageCollection = database.collection("contactMessages");
const attendanceCollection = database.collection("attendance");
module.exports = {
  usersCollection,
  workCollection,
  payrollCollection,
  employeeCollection,
  contactMessageCollection,
  attendanceCollection
};
