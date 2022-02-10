import "../styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import Header from "../components/Header";
import { i18n } from "@lingui/core";
import { initTranslation, loadTranslation } from "../utils";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { I18nProvider } from "@lingui/react";

//initialization function
initTranslation(i18n);

const getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const locale = appContext.ctx.locale!;
  const translation = await loadTranslation(
    locale,
    process.env.NODE_ENV === "production"
  );

  return { ...appProps, translation };
};

function MyApp({
  Component,
  pageProps,
  translation,
}: AppProps & Awaited<ReturnType<typeof getInitialProps>>) {
  const router = useRouter();
  const locale = router.locale || router.defaultLocale!;
  const firstRender = useRef(true);

  // run only once on the first render (for server side)
  if (translation && firstRender.current) {
    i18n.load(locale, translation);
    i18n.activate(locale);
  }

  useEffect(() => {
    if (translation && !firstRender.current) {
      i18n.load(locale, translation);
      i18n.activate(locale);
    }
  }, [locale, translation]);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <div className="bg-gray-800 ">
        <Header />
        <Component {...pageProps} />
      </div>
    </I18nProvider>
  );
}

MyApp.getInitialProps = getInitialProps;

export default MyApp;
