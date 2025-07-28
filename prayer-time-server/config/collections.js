const { client } = require("./db");

const database = client.db("prayerTimeDB");

const locationsCollection = database.collection("locations");
module.exports = {
  locationsCollection,
};
