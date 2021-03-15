import Head from 'next/head'

import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Layout(props) {
  return (
    <div className="container">
      <Head>
        <title>Kissy如吻 UK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header {...props}/>
        <div>{props.children}</div>
      </main>

      <Footer {...props}/>
    </div>
  )
}
