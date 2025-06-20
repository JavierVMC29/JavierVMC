import { useTranslations } from 'next-intl';
import { AboutKeys } from '../utils/keys';
import { Card } from '@/components/ui/card';
import { GlobalMessageKeys } from '@/i18n/keys';

interface AboutListProps {
  title: string;
  keysAmount: number;
}

const AboutList = ({
  title,
  keysAmount,
}: AboutListProps) => {
  const t = useTranslations(GlobalMessageKeys.About);
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">
        {title}
      </h3>
      <Card>
        <ul className="flex flex-col gap-4 items-start">
          {Array.from({ length: keysAmount }).map((_, index) => (
            <li
              key={index}
              className="list-disc ml-10"
            >
              {t(`${AboutKeys.Concepts}.content_${index + 1}`)}
            </li>
          ))}
        </ul>
      </Card>
    </div >
  )
}

export default AboutList