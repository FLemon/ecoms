import Stripe from 'stripe'
const stripe = Stripe(process.env.STRIPE_KEY_SECRET);

export default async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.id)

  res.status = 200
  res.json({ paymentStatus: session.payment_status })
}
