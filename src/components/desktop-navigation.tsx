"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useLayoutEffect, useRef } from "react";
import { isCurrentRoute, primaryNavigation } from "./navigation-links";

export function DesktopNavigation() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const positionIndicator = useCallback((link: HTMLAnchorElement) => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;

    if (!nav || !indicator) return;

    const navRect = nav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    indicator.style.setProperty(
      "--nav-indicator-x",
      `${linkRect.left - navRect.left - nav.clientLeft}px`,
    );
    indicator.style.setProperty("--nav-indicator-width", `${linkRect.width}px`);
  }, []);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    const activeLink = nav?.querySelector<HTMLAnchorElement>('a[aria-current="page"]');

    if (!nav || !indicator || !activeLink) {
      indicator?.classList.remove("is-ready");
      return;
    }

    positionIndicator(activeLink);
    const revealFrame = requestAnimationFrame(() => indicator.classList.add("is-ready"));
    const resizeObserver = new ResizeObserver(() => positionIndicator(activeLink));
    resizeObserver.observe(nav);

    return () => {
      cancelAnimationFrame(revealFrame);
      resizeObserver.disconnect();
    };
  }, [pathname, positionIndicator]);

  return (
    <nav ref={navRef} className="desktop-nav" aria-label="Primary navigation">
      <span ref={indicatorRef} className="nav-active-indicator" aria-hidden="true" />
      {primaryNavigation.map((item) => {
        const active = isCurrentRoute(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={active ? "active" : undefined}
            aria-current={active ? "page" : undefined}
            onClick={(event) => positionIndicator(event.currentTarget)}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
