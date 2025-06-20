import SectionTitle from '@/components/sections/title';
import { GlobalMessageKeys } from '@/i18n/keys';
import { useTranslations } from 'next-intl';
import React from 'react'
import { HOME_SKILLS_CARDS, HOME_SKILLS_ITEMS } from '../utils/skills';
import HomeSkillsItem from './item';

const Skills = 'Skills';

const HomeSkils = () => {
  const t = useTranslations(`${GlobalMessageKeys.HomePage}.${Skills}`);
  return (
    <div className="theme-background">
      <main className="page-container">
        <SectionTitle
          title={t(`title`)}
          description={t(`content`)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOME_SKILLS_ITEMS.map((item) => (
            <div
              key={item}
            >
              <HomeSkillsItem
                title={t(`${item}.title`)}
                description={t(`${item}.content`)}
                icon={HOME_SKILLS_CARDS[item as keyof typeof HOME_SKILLS_CARDS].icon}
                skills={HOME_SKILLS_CARDS[item as keyof typeof HOME_SKILLS_CARDS].items}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default HomeSkils