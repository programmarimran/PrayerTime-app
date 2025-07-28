const { ObjectId } = require("mongodb");
const moment = require("moment");
const { contactMessageCollection } = require("../config/collections");
// POST /contact-messages
const addContactMessage = async (req, res) => {
  try {
    const messageData = req.body;

    // Auto-append date
    // messageData.date = new Date();
    messageData.date = moment().format("YYYY-MM-DD HH:mm:ss");
    messageData.read = false;

    const result = await contactMessageCollection.insertOne(messageData);
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to send message", error: error.message });
  }
};

//  GET /contact-messages admin dashboard
const getAllMessages = async (req, res) => {
  try {
    const messages = await contactMessageCollection
      .find()
      .sort({ date: -1 })
      .toArray();
    res.status(200).send(messages);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to get messages", error: error.message });
  }
};

//update contac message
const updateContactMessageRead = async (req, res) => {
  try {
    const messageId = req.params.id;
    const updated = await contactMessageCollection.updateOne(
      { _id: new ObjectId(messageId) },
      { $set: { read: true } }
    );
    if (updated.modifiedCount === 0) {
      return res.status(404).json({ message: "Message not found or already marked as read" });
    }

    res.status(200).json({ message: "Marked as read", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark as read", error });
  }
};


module.exports = {
  addContactMessage,
  getAllMessages,
  updateContactMessageRead,
};
