const {
  servicesCollection,
  testimonialsCollection,
  teamMembersCollection,
  faqsCollection,
} = require("../config/homeCollection");

const getHomePageData = async (req, res) => {
  try {
    const [services, testimonials, teamMembers, faqs] = await Promise.all([
      servicesCollection.find().toArray(),
      testimonialsCollection.find().toArray(),
      teamMembersCollection.find().toArray(),
      faqsCollection.find().toArray(),
    ]);

    res.json({
      services,
      testimonials,
      teamMembers,
      faqs,
    });
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {getHomePageData};
