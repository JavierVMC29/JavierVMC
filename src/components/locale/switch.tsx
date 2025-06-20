"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { GlobalMessageKeys } from "@/i18n/keys";
import { getCurrentLocale } from "@/lib/data/string/getCurrentLocale";

export default function LocaleSwitch() {
  const t = useTranslations(GlobalMessageKeys.Languages);
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLocale = (currentLocale: string, newLocale: string) => {
    const newPathname = pathname.replace(currentLocale, newLocale);
    router.push(newPathname);
  };

  const currentLocale = getCurrentLocale(pathname);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuLabel>{t("name")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={"en" === currentLocale} onCheckedChange={() => handleChangeLocale(currentLocale, "en")}>
          English
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={"es" === currentLocale} onCheckedChange={() => handleChangeLocale(currentLocale, "es")}>
          Español
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
