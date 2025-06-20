import { useTranslations } from 'next-intl';
import { AboutKeys, AboutSkillKeys } from '../utils/keys'
import AboutSkillsItems from './items';
import { MICROSERVICES_SKILLS, DATABASES_SKILLS, FRAMEWORK_LIBRARIES_SKILLS, LANGUAGE_SKILLS, TEST_SKILLS } from '../utils/skills';
import { GlobalMessageKeys } from '@/i18n/keys';

const AboutSkills = () => {
  const t = useTranslations(GlobalMessageKeys.About);
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-bold text-2xl">
        {t(`${AboutKeys.Skills}.title`)}
      </h3>
      <div className="flex flex-col gap-8">
        <AboutSkillsItems
          title={t(`${AboutKeys.Skills}.${AboutSkillKeys.Languages}.title`)}
          items={LANGUAGE_SKILLS}
        />
        <AboutSkillsItems
          title={t(`${AboutKeys.Skills}.${AboutSkillKeys.Frameworks}.title`)}
          items={FRAMEWORK_LIBRARIES_SKILLS}
        />
        <AboutSkillsItems
          title={t(`${AboutKeys.Skills}.${AboutSkillKeys.Databases}.title`)}
          items={DATABASES_SKILLS}
        />
        <AboutSkillsItems
          title={t(`${AboutKeys.Skills}.${AboutSkillKeys.Microservices}.title`)}
          items={MICROSERVICES_SKILLS}
        />
        <AboutSkillsItems
          title={t(`${AboutKeys.Skills}.${AboutSkillKeys.Tests}.title`)}
          items={TEST_SKILLS}
        />
      </div>
    </div>
  )
}

export default AboutSkills