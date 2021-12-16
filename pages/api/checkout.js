import { validateCartItems } from 'use-shopping-cart/src/serverUtil'
import Stripe from 'stripe'
import DataClient from '@components/DataClient'

const calculateDeliveryPrice = (cartCount) => {
  var price = 0
  switch(cartCount) {
    case 1:
      price = 499
      break
    case 2:
      price = 599
      break
    default:
      break
  }
  return price
}

export default async (req, res) => {
  const { validate_only } = req.query
  const { cartItems, cartCount } = req.body
  const inventory = await DataClient.getInventories()
  const line_items = validateCartItems(inventory, cartItems)
  const deliveryPrice = calculateDeliveryPrice(cartCount)

  if (deliveryPrice > 0) {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'GBP',
        unit_amount: deliveryPrice,
        product_data: {
          name: 'Delivery',
          description: 'Delivery Charge',
          images: [],
          metadata: {
            sku: "delivery"
          }
        }
      }
    })
  }

  if (line_items.length === 0 || validate_only) {
    res.status = 200
    res.json({
      validated: line_items.length,
      items: line_items
    })
  } else {
    const stripe = Stripe(process.env.STRIPE_KEY_SECRET);
    const callbackUrl = `${req.headers.origin}?stripe_session_id={CHECKOUT_SESSION_ID}`
    const session = await stripe.checkout.sessions.create({
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
