import Head from 'next/head'

import Header from '@components/Header'
import Footer from '@components/Footer'
import { GaTracking } from '@components/GaTracking'
import { Box } from "@chakra-ui/react"

export default function Layout({categories, posts, children}) {
  return (
    <div className="container">
      <Head>
        <title>Kissy ruwen UK 如吻</title>
        <meta name="description" content="comfort styled lingerie and underwear" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        {process.env.NODE_ENV === "producion" && <GaTracking />}
      </Head>

      <main>
        <Header categories={categories}/>
        <Box pt="60px">{children}</Box>
      </main>

      <Footer categories={categories} posts={posts}/>
    </div>
  )
}
