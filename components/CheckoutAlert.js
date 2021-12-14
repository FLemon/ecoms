import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import {
  Collapse, Alert, AlertIcon, AlertTitle, AlertDescription, Link
} from "@chakra-ui/react"
import { useShoppingCart } from "use-shopping-cart"
import { loadStripe } from '@stripe/stripe-js'
import useSWR from 'swr'
import axios from "axios"
import S from "string"

export default function CheckoutAlert(props) {
  const router = useRouter()
  const { clearCart, cartCount } = useShoppingCart()
  const [alert, setAlert] = useState({})
  const [stripeSessionId, setStripeSessionId] = useState(router.query.stripeSessionId)

  useEffect(() => {
    const newAlert = {}

    const fetchStripeCheckout = async (sessionId) => {
      try {
        const res =  await axios.get(`/api/checkout_session/${sessionId}`)
        const { paymentStatus } = res.data
        switch(paymentStatus) {
          case "paid":
            newAlert.status = "success"
            newAlert.message = "thank you for your payment"
            clearCart()
            break
          case "unpaid":
            newAlert.status = "warning"
            newAlert.message = "payment pending"
            break
        }
        setAlert({...alert, ...newAlert})
      } catch (err) {
        setAlert({...alert, status: "error", message: err.message })
        console.log(err)
      }
    }

    const fetchPaypalOrder = async (orderId) => {
      try {
        const res = await axios.get(`/api/paypal_order/${orderId}`)
        const { status } = res.data.order
        switch(status.toLowerCase()) {
          case "completed":
            newAlert.status = "success"
            newAlert.message = "thank you for your payment"
            clearCart()
            break
          case "void":
            newAlert.status = "warning"
            newAlert.message = "payment void"
            break
          default:
            newAlert.status = "info"
            newAlert.message = `payment ${status}`
            break
        }
        setAlert({...alert, ...newAlert})
      } catch (err) {
        setAlert({...alert, status: "error", message: err.message })
        console.log(err)
      }
    }

    const paypalOrderId = router.query.paypal_order_id
    if (router.query.stripe_session_id) {
      setStripeSessionId(router.query.stripe_session_id)
      fetchStripeCheckout(router.query.stripe_session_id)
    } else if (paypalOrderId) {
      fetchPaypalOrder(paypalOrderId)
    } else {}
  }, [router.query])

  const continueCheckout = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    await stripe.redirectToCheckout({ sessionId: stripeSessionId });
  }

  return (
    <Collapse in={alert.status ? true : false} animateOpacity>
      {alert.status && (
        <Alert alignItems="center" justifyContent="center" textAlign="center" status={alert.status}>
          <AlertIcon />
          <AlertTitle>{S(alert.message).humanize().titleCase().s}</AlertTitle>
          {
            alert.status === "warning" &&
              <AlertDescription>
                <Link onClick={continueCheckout}>Click here to continue checkout</Link>
              </AlertDescription>
          }
        </Alert>
      )}
    </Collapse>
  )
}
