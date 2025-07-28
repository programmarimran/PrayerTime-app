// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  createUser,
  userRole,
  updateUserProfile,
  patchUserProfile,
  specificUser
} = require("../controllers/userController");

router.post("/", createUser);
router.put("/profile", updateUserProfile);
router.patch("/profile", patchUserProfile);
router.get("/user-role/:email", userRole);
router.get("/specific/user/:email", specificUser);

module.exports = router;
