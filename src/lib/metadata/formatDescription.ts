const DESCRIPTION_METADATA_LIMIT = 160;

 export default function formatMetadataDescription(description: string) {
  const hasDescriptionOverflow = description.length > DESCRIPTION_METADATA_LIMIT;
  if (!hasDescriptionOverflow) {
    return description;
  }

  return description.substring(0, DESCRIPTION_METADATA_LIMIT - 3) + '...';
}