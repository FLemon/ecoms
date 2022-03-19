import Head from 'next/head'

import Header from '@components/Header'
import Footer from '@components/Footer'
import GaTracking from '@components/GaTracking'
import { Box } from "@chakra-ui/react"

export default function Layout({categories, posts, children}) {
  return (
    <div className="container">
      <Head>
        <title>Kissy ruwen UK | 如吻| lingerie and underwear | wireless bras</title>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="canonical" href="https://kissyruwen.uk" />
        <meta name="description" content="styled and comfortable lingerie and underwear" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="og:title" property="og:title" content="affordable styled lingerie and underwear shop" />
        <meta name="og:description" property="og:description" content="luxury yet affordable underwears for any mood" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="kissy ruwen bras" />
        <meta property="og:url" content="https://kissyruwen.uk" />
        <GaTracking />
      </Head>

      <main>
        <Header categories={categories}/>
        <Box pt="110px">{children}</Box>
      </main>

      <Footer categories={categories} posts={posts}/>
    </div>
  )
}
