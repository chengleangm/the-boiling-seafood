"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import { SiLobsters } from "react-icons/si";
import { ReservationButton } from "./interactions";
export function SiteFooter() {
  const pathname = usePathname();
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/table") ||
    pathname.startsWith("/inhousemenu")
  )
    return null;
  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-top">
        <div>
          <p className="eyebrow light">Your table is waiting</p>
          <h2>
            LET’S GET
            <br />
            <em>CRACKING.</em>
          </h2>
        </div>
        <ReservationButton label="Book a table" />
      </div>
      <div className="footer-grid">
        <div>
          <p>THE BOILING SEAFOOD</p>
          <span className="tbs-label">
            TBS <SiLobsters aria-label="Lobster" /> · Seafood restaurant
          </span>
          <span>
            <br />
            Fresh Cajun boils with bold Louisiana flavor.
          </span>
        </div>
        <div>
          <p>EXPLORE</p>
          <span>
            <Link href="/menu">Digital menu</Link>
            <br />
            <Link href="/promotions">Promotions</Link>
            <br />
            <Link href="/about">Our story</Link>
            <br />
            <Link href="/gallery">Gallery</Link>
          </span>
        </div>
        <div>
          <p>VISIT & CONTACT</p>
          <span>
            #20 Street 302, BKK1
            <br />
            Phnom Penh, Cambodia
            <br />
            <a href="tel:+85561798383">061 798 383</a>
            <br />
            <Link href="/contact">Open daily · 11am—11pm</Link>
          </span>
        </div>
        <div>
          <p>FOLLOW</p>
          <div className="socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>
      <p className="copyright">
        © 2026 The Boiling Seafood. Interactive demo — no real payments or notifications.
      </p>
    </footer>
  );
}
