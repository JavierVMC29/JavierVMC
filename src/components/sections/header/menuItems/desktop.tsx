import Link from "next/link";
import { useTranslations } from "next-intl";
import { HEADER_MENU_ITEMS } from "../utils/menuItems";
import { GlobalMessageKeys } from "@/i18n/keys";

const HeaderMenuItemsDesktop = () => {
  const t = useTranslations(GlobalMessageKeys.HeaderItems);

  return (
    <div className="flex justify-center items-center">
      {HEADER_MENU_ITEMS.map((item) => (
        <div
          key={t(`${item}.name`)}
          className="px-2 lg:px-6 transition-all"
        >
          <Link
            href={t(`${item}.path`)}
            className="text-sm xl:text-base duration-100 ease-in hover:border-b-brand-primary hover:dark:border-b-white hover:border-b-2 pb-1"
          >
            {t(`${item}.name`)}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default HeaderMenuItemsDesktop