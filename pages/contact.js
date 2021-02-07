import Layout from '@components/Layout'
import DataClient from '@components/DataClient'

export default function Contact(props) {
  return (
    <Layout {...props}>
      <p className="description">
        contact us
      </p>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      categories: await DataClient.getCategories()
    }
  }
}
