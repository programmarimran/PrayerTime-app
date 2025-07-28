const { payrollCollection } = require("../config/collections");


const getPaymentHistoryByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = {
      employeeEmail: email,
      isPaid: true,
    };

    const payments = await payrollCollection
      .find(filter)
      .sort({ year: 1, month: 1 }) // earliest month first
      .skip(skip)
      .limit(limit)
      .toArray();

    const totalCount = await payrollCollection.countDocuments(filter);

    res.status(200).json({
      data: payments,
      total: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payment history", error });
  }
};

module.exports = { getPaymentHistoryByEmail };
