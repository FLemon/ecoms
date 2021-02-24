import Stripe from 'stripe'
const stripe = Stripe(process.env.STRIPE_KEY_SECRET);

export default async (req, res) => {
  const callbackUrl = `${req.headers.origin}/shop?stripe_session_id={CHECKOUT_SESSION_ID}`
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "gbp",
          product_data: {
            name: "vest bra"
          },
          unit_amount: 33,
        },
        quantity: 4,
      }
    ],
    mode: "payment",
    success_url: callbackUrl,
    cancel_url: callbackUrl,
    shipping_address_collection: {
      allowed_countries: ['GB'],
    },
  });

  res.status = 200
  res.json({ id: session.id })
};
