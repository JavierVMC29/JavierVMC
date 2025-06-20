import { useTranslations } from 'next-intl';
import AboutMainDetails from './mainDetails';
import AboutSkills from './skills';
import AboutCards from './cards';
import AboutList from './list';
import { AboutKeys } from './utils/keys';
import { GlobalMessageKeys } from '@/i18n/keys';
import SectionTitle from '../../sections/title';

const AboutPage = () => {
  const t = useTranslations(GlobalMessageKeys.About);
  return (
    <main className="page-container">
      <SectionTitle
        title={t(`title`)}
        description={t(`content`)}
      />

      <section className="flex flex-col gap-12 lg:gap-24 max-w-[1400px] md:flex-row">
        <div className="md:w-1/2 flex flex-col gap-8">
          <AboutMainDetails />
          <AboutList
            title={t(`${AboutKeys.Concepts}.title`)}
            keysAmount={11}
          />
        </div>
        <div className="md:w-1/2 flex flex-col gap-8">
          <AboutSkills />
          <AboutCards />
        </div>
      </section>
    </main>
  )
}

export default AboutPage