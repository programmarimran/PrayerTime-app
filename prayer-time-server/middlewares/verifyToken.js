// middlewares/verifyToken.js
const admin = require("../config/firebase");

const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authorizationHeader.split(" ")[1]; // Format: Bearer <token>

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token format" });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = {
      uid: decoded.uid,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
