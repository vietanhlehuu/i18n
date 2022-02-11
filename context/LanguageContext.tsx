import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dynamicActivate, invalidateLanguage, Language } from "../i18n";
import { useRouter } from "next/router";
import { I18nProvider } from "@lingui/react";
import useFirstRenderSync from "../hooks/useFirstRenderSync";
import { I18n } from "@lingui/core";

type Context = {
  language: Language;
  changeLanguage: (language: Language) => void;
};

const LanguageContext = React.createContext<Context>({} as any);

export const useLanguage = () => useContext(LanguageContext);

type Props = {
  i18n: I18n;
  messages: any;
};

export const LanguageProvider: React.FC<Props> = ({
  children,
  messages,
  i18n,
}) => {
  const router = useRouter();
  const [locale, setLocale] = useState<Language>(
    invalidateLanguage(router.locale)
  );

  const handleChangeLanguage = useCallback((language: Language) => {
    setLocale(language);
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: language });
  }, []);

  useFirstRenderSync(() => {
    dynamicActivate(i18n, locale, messages);
  });

  useEffect(() => {
    dynamicActivate(i18n, locale);
  }, [locale]);

  const value = useMemo(() => {
    return {
      language: locale,
      changeLanguage: handleChangeLanguage,
    };
  }, [locale, handleChangeLanguage]);

  return (
    <I18nProvider i18n={i18n}>
      <LanguageContext.Provider value={value}>
        {children}
      </LanguageContext.Provider>
    </I18nProvider>
  );
};
