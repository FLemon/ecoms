export default function GaTracking(props) {
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}/>
      <script async dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag("js", new Date());

        gtag("config", "${process.env.NEXT_PUBLIC_GA_ID}", {
          page_path: window.location.pathname
        });`
      }}/>
    </>
  )
}
