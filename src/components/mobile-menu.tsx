"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { IoClose, IoMenu } from "react-icons/io5";
import { isCurrentRoute, mobileNavigation } from "./navigation-links";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        className="menu-toggle"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-primary-navigation"
      >
        {open ? <IoClose aria-hidden="true" /> : <IoMenu aria-hidden="true" />}
      </button>

      {open && (
        <nav id="mobile-primary-navigation" className="mobile-nav" aria-label="Mobile navigation">
          <div className="mobile-nav-heading">
            <span>Explore</span>
            <strong>The Boiling Seafood</strong>
          </div>

          <div className="mobile-nav-links">
            {mobileNavigation.map((item, index) => {
              const active = isCurrentRoute(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? "active" : undefined}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span>{item.label}</span>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                </Link>
              );
            })}
          </div>

          <Link className="mobile-order-link" href="/order" onClick={() => setOpen(false)}>
            <span>
              Order now
              <small>Pickup &amp; delivery</small>
            </span>
            <FiArrowUpRight aria-hidden="true" />
          </Link>
        </nav>
      )}
    </>
  );
}
