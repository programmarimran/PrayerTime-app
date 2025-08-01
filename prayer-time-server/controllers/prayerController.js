const axios = require("axios");

const getPrayerTime = async (req, res) => {
  const district = req.query.district;
  if (!district) return res.status(400).json({ error: "District is required" });

  const url = `https://api.aladhan.com/v1/timingsByCity?city=${district}&country=Bangladesh&method=2`;

  try {
    const response = await axios.get(url);
    const timings = response.data.data.timings;
    res.json(timings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prayer times" });
  }
};

const getPrayerTimeByCoords = async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and Longitude are required" });
  }

  const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`;

  try {
    const response = await axios.get(url);
    const timings = response.data.data.timings;
    res.json(timings);
  } catch (error) {
    console.error("Prayer time fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch prayer times by coordinates" });
  }
};

module.exports = {
  getPrayerTime,
  getPrayerTimeByCoords
};
