import Head from 'next/head'

import Header from '@components/Header'
import Footer from '@components/Footer'
import { GaTracking } from '@components/GaTracking'
import { Box } from "@chakra-ui/react"

export default function Layout(props) {
  return (
    <div className="container">
      <Head>
        <title>Kissy如吻 UK</title>
        <link rel="icon" href="/favicon.ico" />
        {process.env.NODE_ENV === "producion" && <GaTracking />}
      </Head>

      <main>
        <Header {...props}/>
        <Box pt="60px">{props.children}</Box>
      </main>

      <Footer {...props}/>
    </div>
  )
}
