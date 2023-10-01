// Can add global CSS files into the project by importing them here
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
  }