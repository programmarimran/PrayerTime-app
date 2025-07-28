const { client } = require("./db");

const database = client.db("workSyncDB");

const servicesCollection = database.collection("services");
const testimonialsCollection = database.collection("testimonials");
const teamMembersCollection = database.collection("teamMembers");
const faqsCollection = database.collection("faqs");
module.exports = {
  servicesCollection,
  testimonialsCollection,
  teamMembersCollection,
  faqsCollection,
};
