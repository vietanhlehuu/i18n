// utils.ts

import type { I18n } from "@lingui/core";
import { en, vi } from "make-plural/plurals";

export function initTranslation(i18n: I18n): void {
  i18n.loadLocaleData({
    en: { plurals: en },
    vi: { plurals: vi },
  });
}

export async function loadTranslation(locale: string, isProduction = true) {
  let data;
  if (isProduction) {
    data = await import(`./translations/locales/${locale}/messages`);
  } else {
    data = await import(`./translations/locales/${locale}/messages.po`);
  }

  return data.messages;
}
