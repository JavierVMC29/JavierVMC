"use client";

import { GlobalMessageKeys } from "@/i18n/keys";
import { useTranslations } from "next-intl";
import ExperienceTimelineDesktopItem from "./desktopItem";
import ExperienceTimelineMobileItem from "./mobileItem";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExperienceTimelineProps {
  experienceAmount: number;
}

const EXPERIENCE_CONTENT_AMOUNT = [7, 4, 3, 3, 3, 3];

const ExperienceTimeline = ({ experienceAmount }: ExperienceTimelineProps) => {
  const isMobile = useIsMobile();
  const t = useTranslations(GlobalMessageKeys.Experience);
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: experienceAmount }).map((_, index) => (
        <div key={index}>
          {isMobile ? (
            <ExperienceTimelineMobileItem
              parentIndex={index + 1}
              date={t(`Experience_${index + 1}.date`)}
              icon={t(`Experience_${index + 1}.icon`)}
              title={t(`Experience_${index + 1}.title`)}
              subtitle={t(`Experience_${index + 1}.subtitle`)}
              contentAmount={EXPERIENCE_CONTENT_AMOUNT[index]}
              htmlContent={t.raw(`Experience_${index + 1}.html_content`)}
            />
          ) : (
            <ExperienceTimelineDesktopItem
              parentIndex={index + 1}
              date={t(`Experience_${index + 1}.date`)}
              icon={t(`Experience_${index + 1}.icon`)}
              title={t(`Experience_${index + 1}.title`)}
              subtitle={t(`Experience_${index + 1}.subtitle`)}
              contentAmount={EXPERIENCE_CONTENT_AMOUNT[index]}
              htmlContent={t.raw(`Experience_${index + 1}.html_content`)}
              contentOrder={index % 2 === 0 ? "right" : "left"}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;
