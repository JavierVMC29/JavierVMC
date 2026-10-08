import { GlobalMessageKeys, getTranslations, type Locale } from "@/i18n";
import { Paths } from "@/lib/paths";

export const SITE_NAME = "Javier Vega Molina";

const DESCRIPTION_METADATA_LIMIT = 160;

export function formatMetadataDescription(description: string) {
  if (description.length <= DESCRIPTION_METADATA_LIMIT) {
    return description;
  }
  return description.substring(0, DESCRIPTION_METADATA_LIMIT - 3) + "...";
}

/** Page `<title>`: the site name alone on the home page, `"<page> - <site>"` elsewhere. */
export function formatTitle(title?: string) {
  return title ? `${title} - ${SITE_NAME}` : SITE_NAME;
}

const PAGE_NAMESPACES: Record<Exclude<Paths, Paths.Home>, GlobalMessageKeys> = {
  [Paths.About]: GlobalMessageKeys.About,
  [Paths.Contact]: GlobalMessageKeys.Contact,
  [Paths.Experience]: GlobalMessageKeys.Experience,
  [Paths.Projects]: GlobalMessageKeys.Projects,
};

/** Title and description of a page; the home page has no title of its own. */
export function getPageMetadata(locale: Locale, path: Paths): { title?: string; description: string } {
  if (path === Paths.Home) {
    return { description: getTranslations(locale, GlobalMessageKeys.HomePage)("Hero.content") };
  }
  const t = getTranslations(locale, PAGE_NAMESPACES[path]);
  return { title: t("title"), description: t("content") };
}

/** File name of a page's social card: `home`, `about`, ... */
export function ogCardName(path: Paths) {
  return path === Paths.Home ? "home" : path.slice(1);
}

/** Social card rendered by src/pages/og/[locale]/[page].png.ts, e.g. `/og/en/about.png`. */
export function ogImagePath(locale: Locale, path: Paths) {
  return `/og/${locale}/${ogCardName(path)}.png`;
}
