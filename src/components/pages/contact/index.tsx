import SectionTitle from "@/components/sections/title"
import ContactCard from "./card"
import { useTranslations } from "next-intl";
import { GlobalMessageKeys } from "@/i18n/keys";
import { cn } from "@/lib/utils";

interface ContactPageProps {
  className?: string;
}

const ContactPage = ({
  className,
}: ContactPageProps) => {
  const t = useTranslations(GlobalMessageKeys.Contact);
  return (
    <main className={cn("page-container lg:h-[75vh]", className)}>
      <SectionTitle
        title={t(`title`)}
        description={t(`content`)}
      />

      <ContactCard />
    </main>
  )
}

export default ContactPage