const { usersCollection } = require("../config/collections");

const verifyEmploy = async (req, res, next) => {
  try {
    const userEmail = req.decoded?.email;

    if (!userEmail) {
      return res.status(401).json({ message: "Unauthorized: No email found" });
    }

    const user = await usersCollection.findOne({ email: userEmail });

    if (!user || user.role !== "Employee") {
      return res.status(403).json({ message: "Forbidden: Employee only" });
    }

    next();
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyEmploy;
