import { AppProps } from 'next/app'
import 'public/css/style.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}