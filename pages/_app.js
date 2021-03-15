import { ChakraProvider } from "@chakra-ui/react"
import { TrackingProvider } from '@components/GaTrackProvider'

function Application({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <TrackingProvider>
        <Component {...pageProps} />
      </TrackingProvider>
    </ChakraProvider>
  )
}

export default Application
