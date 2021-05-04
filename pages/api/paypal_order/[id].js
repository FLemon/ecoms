const paypal = require('@paypal/checkout-server-sdk');
const { NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_SECRET } = process.env

export default async (req, res) => {
  let env = null
  process.env.NODE_ENV === 'production' ?
    env = new paypal.core.LiveEnvironment(NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_SECRET) :
    env = new paypal.core.SandboxEnvironment(NEXT_PUBLIC_PAYPAL_CLIENT_ID, PAYPAL_SECRET)

  const client = new paypal.core.PayPalHttpClient(env)
  const request = new paypal.orders.OrdersGetRequest(req.query.id);
  const response = await client.execute(request);

  res.status = 200
  res.json({ order: response.result })
}
