const {attendanceCollection} = require("../config/collections");

//employ POST attendance
const postAttendance = async (req, res) => {
  try {
    const { uid, role, email, date, createdAt } = req.body;

    if (!uid || !email || !date || !role) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const exists = await attendanceCollection.findOne({ uid, date });

    if (exists) {
      return res.status(409).send({ message: "Attendance already exists for today" });
    }

    const result = await attendanceCollection.insertOne({
      uid,
      role,
      email,
      date,
      createdAt,
    });

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: "Internal server error", error: err.message });
  }
};
//employ
const getMyAttendance = async (req, res) => {
  try {
    const { uid } = req.query;
    const result = await attendanceCollection.find({ uid }).sort({ createdAt: -1 }).toArray();
    res.status(200).json(result);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  postAttendance,
  getMyAttendance
};
