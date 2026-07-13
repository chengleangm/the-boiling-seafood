import Link from "next/link";
import Image from "next/image";
import { ReservationButton, MobileMenu } from "./interactions";

export function SiteHeader(){return <header className="nav-shell"><Link href="/" className="brand" aria-label="The Boiling Seafood home"><Image className="brand-logo" src="/logo/logo (2).png" alt="The Boiling Seafood" width={160} height={72} priority/></Link><nav className="desktop-nav" aria-label="Primary navigation"><Link href="/">Home</Link><Link href="/our-story">Our story</Link><Link href="/menu">Menu</Link><Link href="/visit">Visit</Link></nav><div className="nav-actions"><ReservationButton label="Book a table"/><MobileMenu/></div></header>}
