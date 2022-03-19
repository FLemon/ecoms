import {
  Collapse, Alert, AlertIcon, AlertTitle, AlertDescription, Link,
  Box
} from "@chakra-ui/react"

export default function DeliveryNotice(props) {
  const title = "FREE DELIVERY when order 3+ items!"
  const des = "See Details"
  return (
    <Alert alignItems="center" justifyContent="center" textAlign="center"
      status='info' height='50px' bg='pink.400'
    >
      <AlertTitle color="white" mr={4} fontSize={{ base: 20, md: 40}}>
        {title}
      </AlertTitle>
      <AlertDescription pt={{base: 1, md: 4}} as='u'
        fontWeight='bold' fontSize={{base:10, md: 20}}
      >
        <Link href="/shop/pages/delivery">{des}</Link>
      </AlertDescription>
    </Alert>
  )
}
