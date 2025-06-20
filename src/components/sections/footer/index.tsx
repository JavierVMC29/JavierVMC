import React from 'react'
import { GlobalMessageKeys } from '@/i18n/keys';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { SOCIAL_MEDIA, SOCIAL_MEDIA_KEYS } from '@/lib/constants/socialMedia';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const t1 = useTranslations(GlobalMessageKeys.Footer);
  const t2 = useTranslations(GlobalMessageKeys.SocialMedia);
  return (
    <footer className="my-12 mx-6 sm:m-12 lg:mx-24 lg:mt-20">
      <Separator />
      <div className="flex w-full pt-4">
        <div className="w-full flex flex-col justify-between items-center gap-4 sm:flex-row">
          <p className="text-sm text-center text-secondary">
            © {t1('copyright')}
          </p>
          <div className="flex justify-center gap-8">
            {Object.entries(SOCIAL_MEDIA).map(([key, { name, image, hasLocale, href }]) => (
              <Link
                key={key}
                href={hasLocale ? t2(`${SOCIAL_MEDIA_KEYS[name as keyof typeof SOCIAL_MEDIA_KEYS]}.href`) : href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={image}
                  alt={name}
                  className="dark:invert w-6 h-6"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer