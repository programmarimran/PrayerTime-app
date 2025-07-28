const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // amount in cents, e.g., 5000 = $50
    const paymentIntent = await stripe.paymentIntents.create({
      amount:amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { createPaymentIntent };
