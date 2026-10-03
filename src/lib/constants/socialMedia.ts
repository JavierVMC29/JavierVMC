import type { ImageMetadata } from "astro";
import Linkedin from "@/assets/images/linkedin.png";
import { ICONS, type PublicIcon } from "./icons";

export const SOCIAL_MEDIA_KEYS = {
  LinkedIn: "LinkedIn",
  Email: "Email",
};

interface SocialMedia {
  name: keyof typeof SOCIAL_MEDIA_KEYS | "GitHub";
  image: PublicIcon | ImageMetadata;
  href: string;
  linkName: string;
  /** Take `href` from the `SocialMedia.<name>.href` message instead. */
  hasLocale: boolean;
  /** Take the visible link name from the `SocialMedia.<name>.name` message instead. */
  localeName: boolean;
}

export const SOCIAL_MEDIA: Record<string, SocialMedia> = {
  github: {
    name: "GitHub",
    image: ICONS.github,
    href: "https://github.com/JavierVMC29",
    linkName: "JavierVMC29",
    hasLocale: false,
    localeName: false,
  },
  linkedin: {
    name: "LinkedIn",
    image: Linkedin,
    href: "https://www.linkedin.com/in/javier-vega-molina/",
    linkName: "Javier Vega Molina",
    hasLocale: true,
    localeName: false,
  },
  email: {
    name: "Email",
    image: ICONS.mail,
    href: "mailto:javiervegamolina29@gmail.com",
    linkName: "javiervegamolina29@gmail.com",
    hasLocale: true,
    localeName: true,
  },
};
