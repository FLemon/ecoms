
export default function Category(props) {
  return (
    <div className="container">
      <Head>
        <title>Kissy如吻@•AMY UK</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header categories={props.categories}/>
        <div>{props.children}</div>
      </main>

      <Footer />
    </div>
  )
}
