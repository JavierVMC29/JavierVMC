import { useTranslations } from 'next-intl';
import { AboutEducationsKeys, AboutKeys } from '../utils/keys'
import AboutCardItem from './item';
import { GlobalMessageKeys } from '@/i18n/keys';

const AboutCards = () => {
  const t = useTranslations(GlobalMessageKeys.About);
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-2xl">
        {t(`${AboutKeys.Education}.title`)}
      </h3>
      <div className="flex flex-col gap-8">
        <AboutCardItem cardKey={AboutEducationsKeys.University} />
        <AboutCardItem cardKey={AboutEducationsKeys.Bootcamp} />
      </div>
    </div>
  )
}

export default AboutCards