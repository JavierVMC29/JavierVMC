import { Paths } from '@/lib/paths';
import { Metadata } from 'next';
import { generateContentMetadata } from '@/lib/metadata/generate';
import { getTranslations } from 'next-intl/server';
import { GlobalMessageKeys } from '@/i18n/keys';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generateContentMetadata({
    title: t(`${GlobalMessageKeys.Experience}.title`),
    description: t(`${GlobalMessageKeys.Experience}.content`),
    url: Paths.Experience,
  });
}

export default function ExperienceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
