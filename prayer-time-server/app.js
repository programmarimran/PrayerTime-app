const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const workRoutes = require("./routes/workRoutes");
const hrRoutes = require("./routes/hrRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminPaymentRoutes = require("./routes/AdminPaymentRoutes");
const contactRoutes = require("./routes/contactRoutes");
const homeRoutes = require("./routes/homeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("WorkSync Server is running");
});
//added a route to check server status
app.use("/users", userRoutes);
app.use("/works", workRoutes);
app.use("/hr", hrRoutes);
app.use("/admin", adminRoutes);
app.use("/pay", adminPaymentRoutes);
app.use("/contact-messages", contactRoutes);
app.use("/home", homeRoutes);
app.use("/attendance", attendanceRoutes);
module.exports = app;
