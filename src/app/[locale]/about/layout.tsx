import { Paths } from '@/lib/paths';
import { Metadata } from 'next';
import { generateContentMetadata } from '@/lib/metadata/generate';
import { getTranslations } from 'next-intl/server';
import { GlobalMessageKeys } from '@/i18n/keys';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return generateContentMetadata({
    title: t(`${GlobalMessageKeys.About}.title`),
    description: t(`${GlobalMessageKeys.About}.content`),
    url: Paths.About,
  });
}

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
