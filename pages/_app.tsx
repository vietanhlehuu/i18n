import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import Header from "../components/Header";
import { invalidateLanguage, loadMessages } from "../i18n";
import { LanguageProvider } from "../context/LanguageContext";
import { i18n } from "@lingui/core";

async function getInitialProps(appContext: AppContext) {
  const appProps = await App.getInitialProps(appContext);
  const locale = invalidateLanguage(appContext.ctx.locale);

  // This should run once on the server side the first time the app is loaded.
  let messages = {};
  if (!i18n.messages || Object.keys(i18n.messages).length === 0) {
    messages = (await loadMessages(locale)).messages;
  }
  return { ...appProps, messages: messages };
}

function MyApp({
  Component,
  pageProps,
  messages,
}: AppProps & { messages: any }) {
  return (
    <LanguageProvider i18n={i18n} messages={messages}>
      <div className="bg-gray-800 relative isolate">
        <Header />
        <Component {...pageProps} />
      </div>
    </LanguageProvider>
  );
}

MyApp.getInitialProps = getInitialProps;

export default MyApp;
