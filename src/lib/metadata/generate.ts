import { Metadata } from 'next';
import formatMetadataDescription from './formatDescription';
import { defaultOpenGraphMetadata } from './defaultOpenGraph';
import OpenGraphImage from '@/../public/assets/metadata/opengraph.jpg';

interface GenerateContentMetadataProps {
  title: string;
  url: string;
  description?: string;
}

export function generateContentMetadata({
  title,
  url,
  description = '',
}: GenerateContentMetadataProps): Metadata {
  const metadataDescription = formatMetadataDescription(description);

  const openGraphMetadata = {
    ...defaultOpenGraphMetadata,
    title: title,
    description: metadataDescription,
    url: url,
  };

  return {
    title: title,
    description: metadataDescription,
    openGraph: {
      ...openGraphMetadata,
      images: {
        url: OpenGraphImage.src,
        width: 1200,
        height: 630,
      }
    },
  };
}
