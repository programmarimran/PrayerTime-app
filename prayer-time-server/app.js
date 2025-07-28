const express = require("express");
const app = express();
const cors = require("cors");
const locationRoutes = require("./routes/locationRoutes");
const prayerRoutes = require("./routes/prayerRoutes");
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("PrayerTime Server is running");
});
//added a route to check server status
app.use("/locations", locationRoutes);
app.use("/prayer-time", prayerRoutes);

module.exports = app;
