import type { I18n } from "@lingui/core";
import { en, vi } from "make-plural/plurals";

export type Language = "en" | "vi";

const LANGUAGES: Language[] = ["en", "vi"];
export const DEFAULT_LANGUAGE: Language = "vi";
export const LANG_KEY = "lang";

export const validateLanguage = (language: Language): boolean => {
  if (LANGUAGES.includes(language)) {
    return true;
  }
  return false;
};

// return default language if the language is not valid
export const invalidateLanguage = (language: any): Language => {
  if (validateLanguage(language)) {
    return language;
  }
  return DEFAULT_LANGUAGE;
};

export const plurals: { [language in Language]: any } = {
  en,
  vi,
};

export const dynamicActivate = async (
  i18n: I18n,
  locale: string,
  messages?: any
) => {
  if (i18n.locale === locale && !messages) {
    return;
  }

  let selectedMessages = messages;
  if (!selectedMessages) {
    selectedMessages = (await loadMessages(locale)).messages;
  }

  i18n.load(locale, selectedMessages);
  i18n.loadLocaleData(locale, { plurals: plurals[invalidateLanguage(locale)] });
  i18n.activate(locale);
};

export const loadMessages = async (locale: string) => {
  const isProduction = process.env.NODE_ENV === "production";
  if (isProduction) {
    return import(`./translations/${locale}/messages`);
  } else {
    return import(`./translations/${locale}/messages.po`);
  }
};
