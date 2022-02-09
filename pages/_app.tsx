import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-gray-800 ">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
