import routes from "./routes";

export const headerNavigation = [
  {
    label: "Home",
    href: routes.HOME,
  },
  {
    label: "About",
    href: routes.ABOUT,
  },
  {
    label: "Github",
    href: routes.GITHUB,
    target: "_blank",
  },
] as const;

export const foooterNavigationAbout = [
  {
    label: "Privacy Policy",
    href: `${routes.ABOUT}#privacy`,
  },
  {
    label: "What is harmonique?",
    href: `${routes.ABOUT}#what`,
  },
  {
    label: "Why create harmonique?",
    href: `${routes.ABOUT}#why`,
  },
] as const;
