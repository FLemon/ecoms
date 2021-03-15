import Head from 'next/head'

import Header from '@components/Header'
import Footer from '@components/Footer'
import { GaTracking } from '@components/GaTracking'

export default function Layout(props) {
  return (
    <div className="container">
      <GaTracking>
        <title>Kissy如吻 UK</title>
        <link rel="icon" href="/favicon.ico" />
      </GaTracking>

      <main>
        <Header {...props}/>
        <div>{props.children}</div>
      </main>

      <Footer {...props}/>
    </div>
  )
}
