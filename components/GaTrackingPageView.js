export default function GaTrackingPageView(url) {
  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
    page_path: url,
  })
}
