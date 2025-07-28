// controllers/userController.js
const { usersCollection } = require("../config/collections");
// register howar sata sate save database
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    // console.log(userData);

    if (!userData?.uid || !userData?.email) {
      return res
        .status(400)
        .json({ message: "uid, email, and role are required" });
    }
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ uid: userData?.uid });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    // Insert new user
    const newUser = {
      ...userData,
      isVerified: false,
    };

    await usersCollection.insertOne(newUser);

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//update user profile

const updateUserProfile = async (req, res) => {
  try {
    const data = req.body;
    // console.log(data);

    const find = { email: data?.email };
    const updateData = {
      $set: data,
    };

    const result = await usersCollection.updateOne(find, updateData);

    if (result.modifiedCount > 0) {
      res.json({ message: "Profile updated successfully" });
    } else {
      res.json({ message: "No changes made" });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//patch user profile
const patchUserProfile = async (req, res) => {
  try {
    const { email, ...updateFields } = req.body;
    // console.log(email)
    // console.log(updateFields)
    const result = await usersCollection.updateOne(
      { email },
      { $set: updateFields }
    );
// console.log(result)
    if (result.modifiedCount > 0) {
      res.json({ message: "Profile patched successfully" });
    } else {
      res.json({ message: "No changes made" });
    }
  } catch (error) {
   
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//user er role check korar jonno
const userRole = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await usersCollection.findOne({ email });
    return res.send({ role: user?.role || null });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};
const specificUser = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await usersCollection.findOne({ email });
    return res.send(user);
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = { createUser, userRole, updateUserProfile,patchUserProfile,specificUser };
