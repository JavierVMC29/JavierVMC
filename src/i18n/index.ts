import en from "../../messages/en.json";
import es from "../../messages/es.json";

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
};

const MESSAGES: Record<Locale, Messages> = { en, es };

type Messages = { [key: string]: string | Messages };

export enum GlobalMessageKeys {
  Languages = "Languages",
  SocialMedia = "SocialMedia",
  HomePath = "HomePath",
  HeaderItems = "HeaderItems",
  Footer = "Footer",
  HomePage = "HomePage",
  About = "About",
  Experience = "Experiences",
  Projects = "Projects",
  Contact = "Contact",
}

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** `getStaticPaths` helper for pages under `src/pages/[locale]/`. */
export function getLocaleStaticPaths() {
  return LOCALES.map((locale) => ({ params: { locale } }));
}

/** Prefixes a route path (e.g. `/about`, `/`) with the locale. */
export function localizePath(locale: Locale, path: string) {
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

function resolve(locale: Locale, fullKey: string): string | Messages {
  const value = fullKey
    .split(".")
    .reduce<string | Messages | undefined>(
      (node, part) => (node && typeof node === "object" ? node[part] : undefined),
      MESSAGES[locale],
    );

  if (value === undefined) {
    throw new Error(`[i18n] Missing message "${fullKey}" for locale "${locale}"`);
  }
  return value;
}

/**
 * Returns a translator scoped to `namespace`, mirroring next-intl's `useTranslations`.
 * Missing keys throw so they fail the build instead of rendering the key path.
 */
export function getTranslations(locale: Locale, namespace?: string) {
  const fullKey = (key: string) => (namespace ? `${namespace}.${key}` : key);

  const t = (key: string): string => {
    const value = resolve(locale, fullKey(key));
    if (typeof value !== "string") {
      throw new Error(`[i18n] Message "${fullKey(key)}" for locale "${locale}" is not a string`);
    }
    return value;
  };

  /**
   * Returns the keys under `key` that look like `<prefix><n>` (e.g. `content_1`, `content_2`),
   * sorted by `n`. Used to iterate over numbered entries without hardcoding their count.
   */
  t.numberedKeys = (key: string, prefix: string): string[] => {
    const node = key ? resolve(locale, fullKey(key)) : namespace ? resolve(locale, namespace) : MESSAGES[locale];
    if (typeof node !== "object") return [];

    const pattern = new RegExp(`^${prefix}(\\d+)$`);
    return Object.keys(node)
      .map((k) => ({ k, n: Number(pattern.exec(k)?.[1]) }))
      .filter(({ n }) => !Number.isNaN(n))
      .sort((a, b) => a.n - b.n)
      .map(({ k }) => k);
  };

  /** Child keys of an object message (the namespace itself when `key` is empty). */
  t.childKeys = (key: string): string[] => {
    const node = key ? resolve(locale, fullKey(key)) : namespace ? resolve(locale, namespace) : MESSAGES[locale];
    return typeof node === "object" ? Object.keys(node) : [];
  };

  return t;
}
