import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileMenu } from "./mobile-menu";
import { CartLink } from "./order-ui";

export function SiteHeader() {
  return (
    <>
      <div className="demo-ribbon">
        Interactive Demo <span>Payments & notifications are simulated</span>
      </div>
      <header className="nav-shell">
        <div className="nav-inner">
          <Link href="/" className="brand" aria-label="The Boiling Seafood home">
            <Image
              className="brand-logo"
              src="/logo/logo (2).png"
              alt="The Boiling Seafood"
              width={128}
              height={128}
              priority
            />
          </Link>

          <DesktopNavigation />

          <div className="nav-actions">
            <CartLink />
            <Link className="red-button nav-order-button" href="/order">
              <span>Order now</span>
              <FiArrowUpRight aria-hidden="true" />
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
