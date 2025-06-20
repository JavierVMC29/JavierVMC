import { useTranslations } from 'next-intl';
import { GlobalMessageKeys } from '@/i18n/keys';
import SectionTitle from '../../sections/title';
import ExperienceTimeline from './timeline';

const ExperiencePage = () => {
  const t = useTranslations(GlobalMessageKeys.Experience);
  return (
    <main className="page-container">
      <SectionTitle
        title={t(`title`)}
        description={t(`content`)}
      />

      <ExperienceTimeline 
        experienceAmount={4}
      />
    </main>
  )
}

export default ExperiencePage