import HtmlGenerator from "@/components/generator/html";
import { GlobalMessageKeys } from "@/i18n/keys";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { handleExperienceTimelineIconImage } from "./utils/functions";
import { Card } from "@/components/ui/card";

interface ExperienceTimelineDesktopItemProps {
  parentIndex: number;
  date: string;
  icon: string;
  title: string;
  subtitle: string;
  contentAmount: number;
  htmlContent?: string;
  contentOrder: 'left' | 'right';
}

const ExperienceTimelineDesktopItem = ({
  parentIndex,
  date,
  icon,
  title,
  subtitle,
  contentAmount,
  htmlContent,
  contentOrder,
}: ExperienceTimelineDesktopItemProps) => {
  const t = useTranslations(GlobalMessageKeys.Experience);
  return (
    <div className="flex w-full max-w-6xl gap-4">
      <div className={cn("flex-1 mt-3", {
        'order-3 text-left': contentOrder === 'left',
        'order-1 text-right': contentOrder === 'right'
      })}
      >
        <p className="font-semibold">
          {date}
        </p>
      </div>

      <div className="order-2 flex flex-col items-center gap-8">
        <div className="flex items-center justify-center min-w-12 min-h-12 rounded-full theme-background">
          <Image
            src={handleExperienceTimelineIconImage(icon)}
            alt={icon}
            className="min-w-8 min-h-8 dark:invert"
          />
        </div>

        <hr className="w-1 h-full rotate-180 theme-background"></hr>
      </div>

      <Card className={cn("flex-1", {
        'order-1 text-right': contentOrder === 'left',
        'order-3 text-left': contentOrder === 'right'
      })}>
        <div className="px-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-xl">
              {title}
            </h3>
            <p className="font-semibold text-lg">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {Array.from({ length: contentAmount }).map((_, index) => (
              <p
                className="text-secondary"
                key={index}
              >
                {t(`Experience_${parentIndex}.content_${index + 1}`)}
              </p>
            ))}
          </div>

          {htmlContent && (
            <div className={cn("flex gap-1 text-secondary", {
              "justify-end": contentOrder === 'left',
              "justify-start": contentOrder === 'right'
            })}>
              <HtmlGenerator
                html={htmlContent}
                allowAttr={['target']}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default ExperienceTimelineDesktopItem