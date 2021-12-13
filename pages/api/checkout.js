import { validateCartItems } from 'use-shopping-cart/src/serverUtil'
import Stripe from 'stripe'
import DataClient from '@components/DataClient'

export default async (req, res) => {
  const { validate_only } = req.query
  const cartItems = req.body
  const inventory = await DataClient.getInventories()
  const line_items = validateCartItems(inventory, cartItems)

  if (line_items.length === 0 || validate_only) {
    res.status = 200
    res.json({ validated: line_items.length, items: line_items })
  } else {
    const stripe = Stripe(process.env.STRIPE_KEY_SECRET);
    const callbackUrl = `${req.headers.origin}?stripe_session_id={CHECKOUT_SESSION_ID}`
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: callbackUrl,
      cancel_url: callbackUrl,
      shipping_address_collection: {
        allowed_countries: ['GB'],
      },
    });

    res.status = 200
    res.json({ id: session.id })
  }
};
