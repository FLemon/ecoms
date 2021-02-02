import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Kissy@AMY.UK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <p className="description">
          Hello Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}
