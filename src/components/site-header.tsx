import Link from "next/link";
import { ReservationButton, MobileMenu } from "./interactions";

export function SiteHeader(){return <header className="nav-shell"><Link href="/" className="brand" aria-label="The Boiling Seafood home"><span className="brand-mark">BS</span><span>THE BOILING<br/>SEAFOOD</span></Link><nav className="desktop-nav" aria-label="Primary navigation"><Link href="/">Home</Link><Link href="/our-story">Our story</Link><Link href="/menu">Menu</Link><Link href="/visit">Visit</Link></nav><div className="nav-actions"><ReservationButton label="Book a table"/><MobileMenu/></div></header>}
