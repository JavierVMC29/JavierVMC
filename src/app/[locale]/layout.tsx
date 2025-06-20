import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/sections/header";
import { ThemeProvider } from "@/providers/theme-provider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import OpenGraphImage from "@/../public/assets/metadata/opengraph.jpg";
import { defaultOpenGraphMetadata } from "@/lib/metadata/defaultOpenGraph";

import "../globals.css";
import "../../styles/animation.css";
import "../../styles/html-generator.css";
import Footer from "@/components/sections/footer";
import formatDescription from "@/lib/metadata/formatDescription";
import { getTranslations } from "next-intl/server";
import { GlobalMessageKeys } from "@/i18n/keys";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const websiteUrl = process.env.NEXT_PUBLIC_BASE_URL as string;

  const { locale } = await params;
  const t = await getTranslations({ locale });

  const metadata = {
    title: "Javier Vega Molina",
    description: t(`${GlobalMessageKeys.HomePage}.Hero.content`),
  };

  return {
    metadataBase: new URL(websiteUrl),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        es: "/es",
      },
    },
    title: {
      template: `%s - ${metadata.title}`,
      default: `${metadata.title}`,
    },
    description: formatDescription(metadata.description),
    openGraph: {
      ...defaultOpenGraphMetadata,
      title: `${metadata.title}`,
      description: `${metadata.description}`,
      images: {
        url: OpenGraphImage.src,
        width: 1200,
        height: 630,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale });
  const metadata = {
    title: "Javier Vega Molina",
    description: t(`${GlobalMessageKeys.HomePage}.Hero.content`),
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/assets/metadata/favicon.ico" sizes="any" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={OpenGraphImage.src} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="luizgustavoalves.dev" />
        <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_BASE_URL}`} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={OpenGraphImage.src} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            <div className="max-w-[1920px] mx-auto">{children}</div>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
