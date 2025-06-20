import Link from "next/link";
import Image from "next/image";
import ProfileImage from "@/../public/assets/images/profile.jpg";
import React from "react";
import { cn } from "@/lib/utils";
import { GlobalMessageKeys } from "@/i18n/keys";
import { useTranslations } from "next-intl";

interface HeaderProfileProps {
  showImage?: boolean;
  showName?: boolean;
  imageClassName?: string;
  hasOrder?: boolean;
}

const HeaderProfile = ({ showImage = true, showName = true, imageClassName, hasOrder = true }: HeaderProfileProps) => {
  const t = useTranslations(GlobalMessageKeys.HomePath);
  return (
    <Link href={t("path")} className={hasOrder ? "order-2 md:order-1" : ""}>
      <div className="flex items-center gap-4">
        {showImage && <Image src={ProfileImage} alt="Javier Vega Molina" className={cn("w-10 h-10 lg:w-14 lg:h-14 rounded-full", imageClassName)} />}
        {showName && <h1 className="text-base lg:text-lg transition-colors font-bold">JAVIER VEGA MOLINA</h1>}
      </div>
    </Link>
  );
};

export default HeaderProfile;
