import Github from "@/../public/assets/icons/github.svg";
import Linkedin from "@/../public/assets/images/linkedin.png";
import Email from "@/../public/assets/icons/mail.svg";

export const SOCIAL_MEDIA_KEYS = {
  LinkedIn: "LinkedIn",
  Email: "Email",
};

export const SOCIAL_MEDIA = {
  github: {
    name: "GitHub",
    image: Github,
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
    image: Email,
    href: "mailto:javiervegamolina29@gmail.com",
    linkName: "javiervegamolina29@gmail.com",
    hasLocale: true,
    localeName: true,
  },
};
