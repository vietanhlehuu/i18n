import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import LanguageProvider from "../context/LanguageContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <div className="bg-gray-800 ">
        <Header />
        <Component {...pageProps} />
      </div>
    </LanguageProvider>
  );
}

export default MyApp;
