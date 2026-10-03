/** SVG icons served as-is from `public/assets/icons`, with their intrinsic size. */
export interface PublicIcon {
  src: string;
  width: number;
  height: number;
}

const icon = (name: string, width = 24, height = 24): PublicIcon => ({
  src: `/assets/icons/${name}.svg`,
  width,
  height,
});

export const ICONS = {
  asterisk: icon("asterisk"),
  book: icon("book"),
  briefcase: icon("briefcase"),
  code: icon("code"),
  externalLink: icon("external-link"),
  flask: icon("flask"),
  github: icon("github", 98, 96),
  globe: icon("globe"),
  hamburgerMenu: icon("hamburguer-menu"),
  mail: icon("mail"),
  router: icon("router"),
  server: icon("server"),
  university: icon("university"),
  wrench: icon("wrench"),
} satisfies Record<string, PublicIcon>;
