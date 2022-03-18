const event = ({ action, params }) => {
  window.gtag('event', action, params)
}

const GATEWAYS = { stripe: "stripe", paypal: "paypal" }

const STAGES = { started: 'started', succeed: 'succeed', voided: 'voided' }

const checkout = (gateway, stage, meta) => {
  event({ action: "checkout", params: { gateway, stage, ...meta } })
}

const stripeStarted = () => { checkout(GATEWAYS.stripe, STAGES.started) }
const stripeSucceed = (sessionId) => { checkout(GATEWAYS.stripe, STAGES.succeed, { sessionId }) }
const stripeVoided = (sessionId) => { checkout(GATEWAYS.stripe, STAGES.voided, { sessionId }) }

const paypalStarted = () => { checkout(GATEWAYS.paypal, STAGES.started) }
const paypalSucceed = () => { checkout(GATEWAYS.paypal, STAGES.succeed) }
const paypalVoided = (orderId) => { checkout(GATEWAYS.paypal, STAGES.voided, { orderId }) }

export default {
  stripeStarted, stripeSucceed, stripeVoided,
  paypalStarted, paypalSucceed, paypalVoided,
}
