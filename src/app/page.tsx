import Image from "next/image";
import { ReservationButton } from "@/components/interactions";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import { SiteHeader } from "@/components/site-header";

const menu = [
  ["The Boiling Signature", "Lobster, snow crab, shrimp, mussels, corn & potato", "$58"],
  ["Garlic Butter King Crab", "Wild-caught legs, roasted garlic butter", "$42"],
  ["Cajun Shrimp Pot", "Head-on shrimp, smoky house Cajun sauce", "$24"],
  ["Charred Lobster Tail", "Herb butter, grilled lemon, sea salt", "$28"],
  ["Ocean Mussels", "White wine, garlic, parsley & sourdough", "$18"],
];

export default function Home() {
  return <main>
    <SiteHeader />

    <section id="home" className="hero">
      <Image src="/images/seafood-feast.png" alt="A platter of lobster, crab, shrimp and mussels" fill priority sizes="100vw" className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="eyebrow light">Phnom Penh Based • Open 11am—11pm</p>
        <h1>SEAFOOD<br/>DONE <em>LOUD.</em></h1>
        <p className="hero-copy">Fresh Cajun seafood boils with bold Louisiana flavor. Dine-in, pick-up and delivery every day.</p>
        <div className="hero-buttons"><ReservationButton label="Reserve your table" /><a className="text-link light-link" href="#menu">Explore the menu <span>↘</span></a></div>
      </div>
      <p className="hero-side">#20 STREET 302 • BKK1 • PHNOM PENH</p>
    </section>

    <section id="story" className="intro section-pad">
      <p className="eyebrow">Our table, your feast</p>
      <div className="intro-grid">
        <h2>We don’t just serve seafood. <em>We start a celebration.</em></h2>
        <div><p>Born from a love of generous tables and big flavor, The Boiling Seafood brings the coast to the city—one steaming, saucy pot at a time.</p><a className="text-link" href="#experience">Discover our story <span>↘</span></a></div>
      </div>
    </section>

    <section id="menu" className="menu-section section-pad">
      <div className="section-heading"><div><p className="eyebrow">Crack. Dip. Repeat.</p><h2>THE MENU</h2></div><p>Choose your catch. Pick your sauce.<br/>Set your spice level. We’ll do the rest.</p></div>
      <div className="menu-layout">
        <div className="menu-list">
          {menu.map(([name, desc, price], i) => <article className="menu-item" key={name}><span className="menu-no">0{i+1}</span><div><h3>{name}</h3><p>{desc}</p></div><strong>{price}</strong></article>)}
          <a href="#contact" className="outline-button">View full menu</a>
        </div>
        <div className="menu-image-wrap"><Image src="/images/seafood-feast.png" alt="Fresh lobster seafood boil" fill sizes="(max-width: 900px) 100vw, 42vw" className="cover"/><span>THE<br/>BOIL</span></div>
      </div>
    </section>

    <section id="experience" className="experience">
      <div className="experience-image"><Image src="/images/restaurant-interior.png" alt="The Boiling Seafood dining room" fill sizes="(max-width: 900px) 100vw, 55vw" className="cover"/></div>
      <div className="experience-copy"><p className="eyebrow light">Made for gathering</p><h2>COME<br/>HUNGRY.<br/><em>LEAVE HAPPY.</em></h2><p>Good food is better shared. Settle in for generous plates, warm hospitality, and a dining room made for memorable nights.</p><ReservationButton label="Plan your visit" /></div>
    </section>

    <section className="testimonials section-pad">
      <p className="eyebrow">From our guests</p><blockquote>“Messy in the best way. The garlic butter sauce is unbelievable—and the lobster was perfectly cooked.”</blockquote><div className="rating"><span>★★★★★</span><p>4.9 average guest rating</p></div>
    </section>

    <footer id="contact">
      <div className="footer-top"><div><p className="eyebrow light">Your table is waiting</p><h2>LET’S GET<br/><em>CRACKING.</em></h2></div><ReservationButton label="Book a table" /></div>
      <div className="footer-grid"><div><p>THE BOILING SEAFOOD</p><span>TBS 🦞 · Seafood restaurant<br/>Fresh Cajun boils with bold Louisiana flavor.</span></div><div><p>VISIT & CONTACT</p><span>#20 Street 302, BKK1<br/>Phnom Penh, Cambodia 120103<br/><a href="tel:+85561798383">061 798 383</a><br/>Open daily · 11am—11pm</span></div><div><p>SERVICES</p><span>Delivery · Takeaway · Dine in</span><p>FOLLOW</p><div className="socials"><a href="#" aria-label="Instagram"><FaInstagram/></a><a href="#" aria-label="Facebook"><FaFacebookF/></a><a href="#" aria-label="TikTok"><FaTiktok/></a></div></div></div>
      <p className="copyright">© 2026 The Boiling Seafood. All rights reserved.</p>
    </footer>
  </main>;
}
