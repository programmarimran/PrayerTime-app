const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
  }
};

module.exports = { connectDB, client };
