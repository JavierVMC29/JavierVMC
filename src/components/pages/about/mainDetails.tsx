import { useTranslations } from 'next-intl';
import { AboutKeys } from './utils/keys'
import { GlobalMessageKeys } from '@/i18n/keys';

const AboutMainDetails = () => {
  const t = useTranslations(GlobalMessageKeys.About);
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-2xl">
        {t(`${AboutKeys.MainInfo}.title`)}
      </h3>
      <p className="text-secondary md:text-justify">
        {t(`${AboutKeys.MainInfo}.content_1`)}
      </p>
      <p className="text-secondary md:text-justify">
        {t(`${AboutKeys.MainInfo}.content_2`)}
      </p>
      <p className="text-secondary md:text-justify">
        {t(`${AboutKeys.MainInfo}.content_3`)}
      </p>
    </div>
  )
}

export default AboutMainDetails