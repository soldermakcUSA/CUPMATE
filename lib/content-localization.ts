import type { Locale } from "@/lib/i18n";

export type LocalizedRow = {
  language_code?: string | null;
};

const dateLocales: Record<Locale, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  pt: "pt-PT",
  it: "it-IT",
  ar: "ar-SA",
  zh: "zh-CN",
  ja: "ja-JP",
  ko: "ko-KR",
  ru: "ru-RU"
};

export function pickLocalizedTranslation<T extends LocalizedRow>(rows: T[] | null | undefined, locale: Locale): T | undefined {
  if (!rows?.length) return undefined;

  return (
    rows.find((row) => row.language_code === locale) ??
    rows.find((row) => row.language_code === "en") ??
    rows[0]
  );
}

export function localizedDateFormatterLocale(locale: Locale) {
  return dateLocales[locale] ?? dateLocales.en;
}
