"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FiCheck,
  FiChevronDown,
  FiChevronRight,
  FiGlobe,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";
import {
  GiCakeSlice,
  GiCookingPot,
  GiCrab,
  GiFrenchFries,
  GiHotMeal,
  GiShrimp,
  GiWineGlass,
} from "react-icons/gi";
import type { CartItem, MenuItem } from "@/lib/demo-data";
import { useDemo } from "./demo-store";
import styles from "./inhouse-menu.module.css";

type MenuSection = {
  label: string;
  icon: IconType;
  categories?: string[];
};

const sections: MenuSection[] = [
  { label: "Chef's Catch", icon: GiCrab },
  { label: "Starters", icon: GiShrimp, categories: ["Fried Dishes"] },
  { label: "Seafood Boils", icon: GiCookingPot, categories: ["Seafood Boils"] },
  {
    label: "House Specials",
    icon: GiHotMeal,
    categories: ["Crab", "Shrimp", "Lobster", "Mussels", "Combo Sets"],
  },
  { label: "Sides", icon: GiFrenchFries, categories: ["Side Dishes"] },
  { label: "Beverages", icon: GiWineGlass, categories: ["Drinks"] },
  { label: "Desserts", icon: GiCakeSlice, categories: ["Desserts"] },
];

const chefPickIds = [
  "cajun-pot",
  "family-feast",
  "calamari",
  "ocean-mussels",
  "lobster-tail",
  "fish-chips",
];

const featuredIds = ["king-crab", "cajun-pot", "lobster-tail", "family-feast"];

const dishImages: Record<string, string> = {
  signature: "/images/inhouse/crab-feast.png",
  "cajun-pot": "/images/inhouse/cajun-shrimp-pot.png",
  "king-crab": "/images/inhouse/crab-feast.png",
  "snow-crab": "/images/inhouse/crab-feast.png",
  "family-feast": "/images/inhouse/crab-feast.png",
  calamari: "/images/inhouse/crispy-calamari.png",
  "shrimp-basket": "/images/inhouse/crispy-calamari.png",
  "fish-chips": "/images/inhouse/crispy-calamari.png",
  "ocean-mussels": "/images/inhouse/ocean-mussels.png",
  "cajun-mussels": "/images/inhouse/ocean-mussels.png",
  "lobster-tail": "/images/inhouse/lobster-tail.png",
  "lobster-roll": "/images/inhouse/lobster-tail.png",
  corn: "/images/inhouse/butter-corn.png",
};

const featuredNames: Record<string, string> = {
  "king-crab": "King Crab Legs",
};

function dishImage(id: string) {
  return dishImages[id] || "/images/seafood-feast.png";
}

export function InhouseMenu() {
  const { menu, cart, add, qty, clear } = useDemo();
  const categoryNavRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("Chef's Catch");
  const [canScrollCategories, setCanScrollCategories] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [orderOpen, setOrderOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [sent, setSent] = useState(false);

  const featured = featuredIds
    .map((id) => menu.find((item) => item.id === id))
    .filter((item): item is MenuItem => Boolean(item));

  const visible = useMemo(() => {
    const section = sections.find((item) => item.label === activeSection);
    if (!section?.categories) {
      return chefPickIds
        .map((id) => menu.find((item) => item.id === id))
        .filter((item): item is MenuItem => Boolean(item));
    }
    return menu.filter((item) => section.categories?.includes(item.category));
  }, [activeSection, menu]);

  const count = cart.reduce((total, item) => total + item.qty, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);

  useEffect(() => {
    if (!orderOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOrderOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [orderOpen]);

  useEffect(() => {
    const activeButton =
      categoryNavRef.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');

    activeButton?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeSection]);

  useEffect(() => {
    const navigation = categoryNavRef.current;
    if (!navigation) return;

    const updateScrollState = () => {
      setCanScrollCategories(
        navigation.scrollLeft + navigation.clientWidth < navigation.scrollWidth - 2,
      );
    };

    updateScrollState();
    navigation.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      navigation.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  function addDish(item: MenuItem) {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1,
      size: "Regular",
      spice: "House preparation",
      sauce: "House sauce",
      notes: "",
    };
    add(cartItem);
    setNotice(`${item.name} added to your order.`);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function openOrder() {
    setSent(false);
    setOrderOpen(true);
  }

  function scrollCategoriesForward() {
    categoryNavRef.current?.scrollBy({
      left: categoryNavRef.current.clientWidth * 0.75,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }

  return (
    <main className={styles.appShell}>
      <aside className={styles.categoryRail} aria-label="In-house menu sections">
        <div className={styles.railLogo}>
          <Image
            src="/logo/logo (2).png"
            alt="The Boiling Seafood"
            width={136}
            height={66}
            priority
          />
        </div>
        <div className={styles.categoryNavFrame}>
          <nav className={styles.categoryNav} ref={categoryNavRef}>
            {sections.map(({ label, icon: Icon }) => (
              <button
                className={activeSection === label ? styles.activeCategory : ""}
                aria-pressed={activeSection === label}
                onClick={() => setActiveSection(label)}
                key={label}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
          <button
            className={`${styles.categoryNextButton} ${
              canScrollCategories ? "" : styles.categoryNextButtonHidden
            }`}
            aria-label="Show more menu categories"
            onClick={scrollCategoriesForward}
            type="button"
          >
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      </aside>

      <div className={styles.pageBody}>
        <header className={styles.inhouseHeader}>
          <div className={styles.headerTitle}>
            <h1>Dine-in menu</h1>
            <span className={styles.kitchenStatus}>
              <i aria-hidden="true" /> Kitchen open
            </span>
          </div>
          <div className={styles.headerActions}>
            <button
              className={styles.languageButton}
              onClick={() => setLanguage((value) => (value === "EN" ? "KH" : "EN"))}
              aria-label={`Language: ${language}`}
            >
              <FiGlobe aria-hidden="true" />
              <span>{language}</span>
              <FiChevronDown aria-hidden="true" />
            </button>
            <button className={styles.viewOrderButton} onClick={openOrder}>
              <FiShoppingBag aria-hidden="true" />
              View order ({count})
            </button>
          </div>
        </header>

        <section className={styles.menuContent}>
          <div className={styles.welcomeCopy}>
            <p>Welcome to The Boiling Seafood.</p>
            <p>Fresh from the ocean. Boldly seasoned. Made to share.</p>
          </div>

          <section className={styles.featuredSection} aria-labelledby="featured-heading">
            <h2 id="featured-heading">Chef&apos;s catch today</h2>
            <div className={styles.featuredGrid}>
              {featured.map((item) => (
                <button
                  className={styles.featuredDish}
                  onClick={() => addDish(item)}
                  aria-label={`Add ${item.name} to order`}
                  key={item.id}
                >
                  <Image
                    src={dishImage(item.id)}
                    alt={item.name}
                    fill
                    loading="eager"
                    sizes="(max-width: 720px) 74vw, (max-width: 1100px) 38vw, 22vw"
                    className={styles.coverImage}
                  />
                  <span className={styles.featuredShade} aria-hidden="true" />
                  <span className={styles.featuredCopy}>
                    <strong>{featuredNames[item.id] || item.name}</strong>
                    <small>{item.description}</small>
                  </span>
                  <b>${item.price.toFixed(0)}</b>
                </button>
              ))}
            </div>
          </section>

          <section className={styles.dishSection} aria-labelledby="dish-heading">
            <div className={styles.sectionHeading}>
              <div>
                <span>Currently showing</span>
                <h2 id="dish-heading">{activeSection}</h2>
              </div>
              <small>
                {visible.length} dish{visible.length === 1 ? "" : "es"}
              </small>
            </div>
            <div className={styles.dishGrid}>
              {visible.map((item) => (
                <article
                  className={`${styles.dishRow} ${!item.available ? styles.unavailable : ""}`}
                  key={item.id}
                >
                  <div className={styles.dishPhoto}>
                    <Image
                      src={dishImage(item.id)}
                      alt={item.name}
                      fill
                      sizes="(max-width: 720px) 100vw, 240px"
                      className={styles.coverImage}
                    />
                  </div>
                  <div className={styles.dishCopy}>
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className={styles.dishAction}>
                    <strong>${item.price.toFixed(0)}</strong>
                    <button
                      onClick={() => addDish(item)}
                      disabled={!item.available}
                      aria-label={`Add ${item.name} to order`}
                    >
                      {item.available ? "Add" : "Unavailable"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>

      <div className={`${styles.orderTray} ${count ? styles.orderTrayVisible : ""}`}>
        <div className={styles.orderTrayLabel}>
          <span>
            Your order <b>({count} items)</b>
          </span>
        </div>
        <div className={styles.trayItems}>
          {cart.slice(0, 2).map((item) => (
            <div className={styles.trayItem} key={`${item.id}-${item.size}`}>
              <Image src={dishImage(item.id)} alt="" width={54} height={54} />
              <span>
                <b>{item.name}</b>
                <small>${(item.price * item.qty).toFixed(0)}</small>
              </span>
              <button onClick={() => qty(item.id, 0)} aria-label={`Remove ${item.name}`}>
                <FiX aria-hidden="true" />
              </button>
            </div>
          ))}
          {count === 0 && <span className={styles.emptyTray}>Add a dish to begin your order.</span>}
        </div>
        <div className={styles.trayTotal}>
          <span>Subtotal</span>
          <strong>${subtotal.toFixed(0)}</strong>
        </div>
        <button className={styles.trayReview} onClick={openOrder} disabled={!count}>
          Review order
        </button>
      </div>

      {notice && (
        <div className={styles.toast} role="status">
          <FiCheck aria-hidden="true" /> {notice}
        </div>
      )}

      {orderOpen && (
        <div className={styles.modalBackdrop} onMouseDown={() => setOrderOpen(false)}>
          <aside
            className={styles.orderPanel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-panel-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span>Dine-in selection</span>
                <h2 id="order-panel-title">Your order</h2>
              </div>
              <button onClick={() => setOrderOpen(false)} aria-label="Close order">
                <FiX aria-hidden="true" />
              </button>
            </header>

            {sent ? (
              <div className={styles.sentState}>
                <FiCheck aria-hidden="true" />
                <h3>Your selection is ready.</h3>
                <p>Show this order to your server when you are ready.</p>
                <button onClick={() => setOrderOpen(false)}>Continue browsing</button>
              </div>
            ) : cart.length ? (
              <>
                <div className={styles.panelItems}>
                  {cart.map((item) => (
                    <article key={`${item.id}-${item.size}`}>
                      <Image src={dishImage(item.id)} alt="" width={84} height={84} />
                      <div>
                        <h3>{item.name}</h3>
                        <p>Regular house preparation</p>
                        <strong>${(item.price * item.qty).toFixed(2)}</strong>
                      </div>
                      <div className={styles.quantityControl}>
                        <button
                          onClick={() => qty(item.id, item.qty - 1)}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <FiMinus aria-hidden="true" />
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => qty(item.id, item.qty + 1)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <FiPlus aria-hidden="true" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
                <footer>
                  <button className={styles.clearOrder} onClick={clear}>
                    Clear order
                  </button>
                  <div>
                    <span>Subtotal</span>
                    <strong>${subtotal.toFixed(2)}</strong>
                  </div>
                  <button className={styles.readyButton} onClick={() => setSent(true)}>
                    Ready for your server
                  </button>
                </footer>
              </>
            ) : (
              <div className={styles.emptyOrder}>
                <FiShoppingBag aria-hidden="true" />
                <h3>Your order is empty.</h3>
                <p>Choose a dish from the menu to get started.</p>
                <button onClick={() => setOrderOpen(false)}>Browse dishes</button>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
