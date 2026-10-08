import type { APIRoute, GetStaticPaths } from "astro";
import { currentRoleKey, professionalYears } from "@/components/pages/experience/data";
import { GlobalMessageKeys, LOCALES, getTranslations, type Locale } from "@/i18n";
import { getPageMetadata, ogCardName } from "@/lib/metadata";
import { renderCard, type CardContent } from "@/lib/og-card";
import { Paths } from "@/lib/paths";

/** One social card per page and locale, at the URL given by `ogImagePath`, e.g. `/og/en/about.png`. */
export const getStaticPaths = (() =>
  LOCALES.flatMap((locale) =>
    Object.values(Paths).map((path) => ({ params: { locale, page: ogCardName(path) }, props: { path } })),
  )) satisfies GetStaticPaths;

function content(locale: Locale, path: Paths): CardContent {
  const tAbout = getTranslations(locale, GlobalMessageKeys.About);
  const tExperience = getTranslations(locale, GlobalMessageKeys.Experience);
  const { title, description } = getPageMetadata(locale, path);

  // Role and years come from the experience timeline, like the About page's "At a glance" card.
  const roleKey = currentRoleKey();
  const eyebrow = roleKey
    ? tAbout("Facts.roleValue")
        .replace("{title}", tExperience(`${roleKey}.title`))
        .replace("{company}", tExperience(`${roleKey}.subtitle`))
    : undefined;

  return {
    eyebrow,
    title: title ?? getTranslations(locale, GlobalMessageKeys.HomePage)("Hero.title"),
    description,
    facts: [
      tAbout("Facts.experienceLong").replace("{count}", String(professionalYears())),
      tAbout("Facts.focusValue"),
      tAbout("Facts.locationValue"),
    ],
  };
}

export const GET: APIRoute = async ({ params, props }) => {
  const png = await renderCard(content(params.locale as Locale, props.path as Paths));
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
