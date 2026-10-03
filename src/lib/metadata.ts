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
