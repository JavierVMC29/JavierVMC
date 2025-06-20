import { Card } from '@/components/ui/card'
import { SOCIAL_MEDIA, SOCIAL_MEDIA_KEYS } from '@/lib/constants/socialMedia'
import Link from 'next/link'
import Image from 'next/image'
import { GlobalMessageKeys } from '@/i18n/keys'
import { useTranslations } from 'next-intl'

const ContactCard = () => {
  const t = useTranslations(GlobalMessageKeys.SocialMedia);
  return (
    <Card className="px-4 sm:px-8 sm:w-[440px]">
      {Object.entries(SOCIAL_MEDIA).map(([key, { name, image, href, hasLocale, localeName, linkName }]) => (
        <Link
          key={key}
          href={hasLocale ? t(`${SOCIAL_MEDIA_KEYS[name as keyof typeof SOCIAL_MEDIA_KEYS]}.href`) : href}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Card className="px-4 group-hover:bg-gray-100 dark:group-hover:bg-neutral-800 transition-all">
            <div className="flex gap-4 items-center">
              <Image
                src={image}
                alt={name}
                className="dark:invert w-8 h-8"
              />
              <div className="flex flex-col">
                <h3 className="font-semibold">
                  {name}
                </h3>
                <p className="text-sm text-secondary">
                  {localeName ? t(`${SOCIAL_MEDIA_KEYS[name as keyof typeof SOCIAL_MEDIA_KEYS]}.name`) : linkName}
                </p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </Card>
  )
}

export default ContactCard