import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { AboutKeys } from "../utils/keys";
import { GlobalMessageKeys } from "@/i18n/keys";

interface AboutCardItemProps {
  cardKey: string;
}

const AboutCardItem = ({
  cardKey,
}: AboutCardItemProps) => {
  const t = useTranslations(GlobalMessageKeys.About);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          {t(`${AboutKeys.Education}.${cardKey}.title`)}
        </CardTitle>
        <CardDescription className="text-secondary font-semibold">
          {t(`${AboutKeys.Education}.${cardKey}.content`)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <p className="text-secondary text-sm">
            {t(`${AboutKeys.Education}.${cardKey}.date`)}
          </p>
          <p className="text-secondary text-sm">
            {t(`${AboutKeys.Education}.${cardKey}.location`)}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default AboutCardItem