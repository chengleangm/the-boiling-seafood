export const primaryNavigation = [
  { href: "/menu", label: "Menu" },
  { href: "/promotions", label: "Promotions" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export const mobileNavigation = [
  { href: "/", label: "Home" },
  ...primaryNavigation,
  { href: "/reservation", label: "Reservations" },
] as const;

export function isCurrentRoute(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}
