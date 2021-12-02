import { AppProps } from 'next/app'
import TransitionLayout from 'utils/TransitionLayout'
import { TransitionProvider } from 'utils/TransitionProvider'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TransitionProvider>
      <TransitionLayout>
        <Component {...pageProps} />
      </TransitionLayout>
    </TransitionProvider>
  )
}

export default MyApp
