import Image from "next/image";
import Link from "next/link";
import { ReservationButton } from "@/components/interactions";
import { FaStar } from "react-icons/fa";
import { FiArrowDownRight } from "react-icons/fi";
import { SiteHeader } from "@/components/site-header";

const menu = [
  ["The Boiling Signature", "Lobster, snow crab, shrimp, mussels, corn & potato", "$58"],
  ["Garlic Butter King Crab", "Wild-caught legs, roasted garlic butter", "$42"],
  ["Cajun Shrimp Pot", "Head-on shrimp, smoky house Cajun sauce", "$24"],
  ["Charred Lobster Tail", "Herb butter, grilled lemon, sea salt", "$28"],
  ["Ocean Mussels", "White wine, garlic, parsley & sourdough", "$18"],
];

export default function Home() {
  return (
    <main>
      <SiteHeader />

      <section id="home" className="hero">
        <Image
          src="/images/seafood-feast.png"
          alt="A platter of lobster, crab, shrimp and mussels"
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">Phnom Penh Based • Open 11am—11pm</p>
          <h1>
            SEAFOOD
            <br />
            DONE <em>LOUD.</em>
          </h1>
          <p className="hero-copy">
            Fresh Cajun seafood boils with bold Louisiana flavor. Dine-in, pick-up and delivery
            every day.
          </p>
          <div className="hero-buttons">
            <ReservationButton label="Reserve your table" />
            <a className="text-link light-link" href="#menu">
              Explore the menu <FiArrowDownRight aria-hidden="true" />
            </a>
          </div>
        </div>
        <p className="hero-side">#20 STREET 302 • BKK1 • PHNOM PENH</p>
      </section>

      <section id="story" className="intro section-pad">
        <p className="eyebrow">Our table, your feast</p>
        <div className="intro-grid">
          <h2>
            We don’t just serve seafood. <em>We start a celebration.</em>
          </h2>
          <div>
            <p>
              Born from a love of generous tables and big flavor, The Boiling Seafood brings the
              coast to the city—one steaming, saucy pot at a time.
            </p>
            <a className="text-link" href="#experience">
              Discover our story <FiArrowDownRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section id="menu" className="menu-section section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Crack. Dip. Repeat.</p>
            <h2>THE MENU</h2>
          </div>
          <p>
            Choose your catch. Pick your sauce.
            <br />
            Set your spice level. We’ll do the rest.
          </p>
        </div>
        <div className="menu-layout">
          <div className="menu-list">
            {menu.map(([name, desc, price], i) => (
              <article className="menu-item" key={name}>
                <span className="menu-no">0{i + 1}</span>
                <div>
                  <h3>{name}</h3>
                  <p>{desc}</p>
                </div>
                <strong>{price}</strong>
              </article>
            ))}
            <a href="#contact" className="outline-button">
              View full menu
            </a>
          </div>
          <div className="menu-image-wrap">
            <Image
              src="/images/seafood-feast.png"
              alt="Fresh lobster seafood boil"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              className="cover"
            />
            <span>
              THE
              <br />
              BOIL
            </span>
          </div>
        </div>
      </section>

      <section className="home-system section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Every way you crave it</p>
            <h2>
              YOUR FEAST.
              <br />
              YOUR WAY.
            </h2>
          </div>
          <p>
            One menu, one kitchen workflow,
            <br />
            three effortless ways to order.
          </p>
        </div>
        <div className="service-grid">
          <article>
            <span>01</span>
            <h3>Delivery</h3>
            <p>Build your boil, pay in the demo checkout and follow its progress.</p>
            <Link href="/order">Start delivery →</Link>
          </article>
          <article>
            <span>02</span>
            <h3>Pickup</h3>
            <p>Order ahead, skip the wait and collect fresh from our BKK1 restaurant.</p>
            <Link href="/order">Order pickup →</Link>
          </article>
          <article>
            <span>03</span>
            <h3>Table QR</h3>
            <p>Scan at your table, customize dishes and send them to the same kitchen queue.</p>
            <Link href="/table/8">Try Table 8 →</Link>
          </article>
        </div>
      </section>

      <section className="promo-home">
        <div>
          <p className="eyebrow light">Weekday seafood celebration</p>
          <h2>
            20% OFF
            <br />
            SEAFOOD BOILS.
          </h2>
          <p>Monday–Thursday, 2–5pm · Demo code BOIL20</p>
          <Link className="red-button" href="/promotions">
            View current offers
          </Link>
        </div>
        <Image
          src="/images/seafood-feast.png"
          alt="Seafood boil promotion"
          fill
          sizes="100vw"
          className="cover"
        />
      </section>

      <section className="home-gallery section-pad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">From our table</p>
            <h2>
              FEAST WITH
              <br />
              YOUR EYES.
            </h2>
          </div>
          <Link className="outline-button" href="/gallery">
            View gallery
          </Link>
        </div>
        <div>
          <figure>
            <Image
              src="/images/seafood-feast.png"
              fill
              sizes="60vw"
              className="cover"
              alt="Signature seafood feast"
            />
          </figure>
          <figure>
            <Image
              src="/images/restaurant-interior.png"
              fill
              sizes="40vw"
              className="cover"
              alt="Restaurant dining room"
            />
          </figure>
        </div>
      </section>

      <section id="experience" className="experience">
        <div className="experience-image">
          <Image
            src="/images/restaurant-interior.png"
            alt="The Boiling Seafood dining room"
            fill
            sizes="(max-width: 900px) 100vw, 55vw"
            className="cover"
          />
        </div>
        <div className="experience-copy">
          <p className="eyebrow light">Made for gathering</p>
          <h2>
            COME
            <br />
            HUNGRY.
            <br />
            <em>LEAVE HAPPY.</em>
          </h2>
          <p>
            Good food is better shared. Settle in for generous plates, warm hospitality, and a
            dining room made for memorable nights.
          </p>
          <ReservationButton label="Plan your visit" />
        </div>
      </section>

      <section className="testimonials section-pad">
        <p className="eyebrow">From our guests</p>
        <blockquote>
          “Messy in the best way. The garlic butter sauce is unbelievable—and the lobster was
          perfectly cooked.”
        </blockquote>
        <div className="rating">
          <span className="star-icons" aria-label="Five star rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} />
            ))}
          </span>
          <p>4.9 average guest rating</p>
        </div>
      </section>

      <section className="home-reservation section-pad">
        <div>
          <p className="eyebrow light">A table worth gathering around</p>
          <h2>
            DINNER PLANS?
            <br />
            <em>WE’VE GOT YOU.</em>
          </h2>
          <p>Open daily from 11:00 AM to 11:00 PM at #20 Street 302, BKK1, Phnom Penh.</p>
        </div>
        <div>
          <Link className="red-button" href="/reservation">
            Request a table
          </Link>
          <Link className="outline-button" href="/contact">
            Location & contact
          </Link>
        </div>
      </section>
    </main>
  );
}
