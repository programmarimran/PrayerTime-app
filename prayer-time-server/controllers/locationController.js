const { locationsCollection } = require("../config/collections");

const getAllDivisions = async (req, res) => {
  try {
    const locationData = await locationsCollection.findOne({
      type: "bangladesh_locations",
    });

    if (!locationData) {
      return res.status(404).json({ message: "Location data not found" });
    }

    const divisionNames = locationData.divisions.map((d) => d.division);
    res.json(divisionNames);
  } catch (error) {
    console.error("Error fetching divisions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDistrictsByDivision = async (req, res) => {
  try {
    const division = req.params.division; // URL থেকে division নাম নিলাম

    const locationData = await locationsCollection.findOne({
      type: "bangladesh_locations",
    });

    if (!locationData) {
      return res.status(404).json({ error: "Location data not found" });
    }

    const selectedDivision = locationData.divisions.find(
      (d) => d.division.toLowerCase() === division.toLowerCase()
    );

    if (!selectedDivision) {
      return res.status(404).json({ error: "Division not found" });
    }

    res.json(selectedDivision.districts); // শুধু সেই division এর districts পাঠাচ্ছি
  } catch (error) {
    console.error("Error fetching districts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllDivisions,
  getDistrictsByDivision,
};
