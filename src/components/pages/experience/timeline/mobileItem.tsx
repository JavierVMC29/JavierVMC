import HtmlGenerator from "@/components/generator/html";
import { GlobalMessageKeys } from "@/i18n/keys";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { handleExperienceTimelineIconImage } from "./utils/functions";

interface ExperienceTimelineMobileItemProps {
  parentIndex: number;
  date: string;
  icon: string;
  title: string;
  subtitle: string;
  contentAmount: number;
  htmlContent?: string;
}

const ExperienceTimelineMobileItem = ({
  parentIndex,
  date,
  icon,
  title,
  subtitle,
  contentAmount,
  htmlContent,
}: ExperienceTimelineMobileItemProps) => {
  const t = useTranslations(GlobalMessageKeys.Experience);
  return (
    <Card className="px-6">
      <div className="flex items-center justify-start gap-4">
        <div className="flex items-center justify-center min-w-12 min-h-12 rounded-full bg-slate-300">
          <Image
            src={handleExperienceTimelineIconImage(icon)}
            alt={icon}
            className="min-w-8 min-h-8"
          />
        </div>
        <p className="font-semibold">
          {date}
        </p>
      </div>

      <Separator />

      <div className="flex flex-col gap-4">
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
          <div className="flex gap-1 text-secondary">
            <HtmlGenerator
              html={htmlContent}
              allowAttr={['target']}
            />
          </div>
        )}
      </div>
    </Card>
  )
}

export default ExperienceTimelineMobileItem