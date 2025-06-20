import SectionTitle from '@/components/sections/title';
import { GlobalMessageKeys } from '@/i18n/keys';
import { useTranslations } from 'next-intl';
import React from 'react'
import { PROJECTS_ITEMS } from './utils/projects';
import ProjectsItem from './item';

const projectTags = [
  1, 1, 1, 2,
]

const ProjectsPage = () => {
  const t = useTranslations(GlobalMessageKeys.Projects);

  const getProjectTags = (key: string, tagAmount: number, tags: string[]) => {
    const projectTags: string[] = [];
    Array.from({ length: tagAmount }).map((_, index) => (
      projectTags.push(`${t(`${key}.tag_${index + 1}`)}`)
    ));
    return [...projectTags, ...tags];
  }

  return (
    <main className="page-container">
      <SectionTitle
        title={t(`title`)}
        description={t(`content`)}
      />

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-[1440px]">
        {Object.entries(PROJECTS_ITEMS).map(([key, { image, href, githubHref, tags }], index) => (
          <div key={key}>
            <ProjectsItem
              image={image}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
              tags={getProjectTags(key, projectTags[index], tags)}
              href={href}
              githubHref={githubHref}
            />
          </div>
        ))}
      </section>
    </main>
  )
}

export default ProjectsPage