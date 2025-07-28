const { workCollection } = require("../config/collections");
const { ObjectId } = require("mongodb");

const getWorks = async (req, res) => {
  const tokenEmail = req.decoded.email;
  const email = req.query.email;
  if (!email) {
    return res.status(400).send({ message: "Email query required" });
  }

  if (email !== tokenEmail) {
    return res.status(403).json({ message: "Forbidden: Email mismatch" });
  }
  const result = await workCollection.find({ email: email }).toArray();
  res.send(result);
};

const addWork = async (req, res) => {
  const work = req.body;
  const result = await workCollection.insertOne(work);
  res.send(result);
};

const updateWork = async (req, res) => {
  const id = req.params.id;
  const updatedWork = req.body;
  const result = await workCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedWork }
  );
  res.send(result);
};

const deleteWork = async (req, res) => {
  const id = req.params.id;
  const result = await workCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};

module.exports = {
  getWorks,
  addWork,
  updateWork,
  deleteWork,
};
