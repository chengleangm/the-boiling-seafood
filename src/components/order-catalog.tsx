"use client";
import { useState } from "react";
import { categories } from "@/lib/demo-data";
import { useDemo } from "./demo-store";
import { AddCard } from "./order-ui";
import { FiChevronRight, FiGrid, FiSearch } from "react-icons/fi";
import {
  GiBowlOfRice,
  GiCookingPot,
  GiCrab,
  GiCupcake,
  GiFrenchFries,
  GiMeal,
  GiMussel,
  GiShrimp,
  GiSodaCan,
} from "react-icons/gi";
import { SiLobsters } from "react-icons/si";
const categoryIcons = {
  All: FiGrid,
  "Seafood Boils": GiCookingPot,
  Crab: GiCrab,
  Shrimp: GiShrimp,
  Lobster: SiLobsters,
  Mussels: GiMussel,
  "Combo Sets": GiMeal,
  "Fried Dishes": GiFrenchFries,
  "Side Dishes": GiBowlOfRice,
  Drinks: GiSodaCan,
  Desserts: GiCupcake,
};
export function OrderCatalog({
  table,
  variant = "online",
}: {
  table?: number;
  variant?: "online" | "inhouse";
}) {
  const { menu } = useDemo();
  const [category, setCategory] = useState("All"),
    [query, setQuery] = useState("");
  const visible = menu.filter(
    (i) =>
      (category === "All" || i.category === category) &&
      `${i.name} ${i.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  const options = ["All", ...categories];
  const intro = table
    ? {
        eyebrow: `Table ${table} digital menu`,
        title: `ORDERING FOR TABLE ${table}`,
        description: "Your order will go directly to the shared demo kitchen dashboard.",
      }
    : variant === "inhouse"
      ? {
          eyebrow: "In-house dining",
          title: "IN-HOUSE MENU",
          description: "Browse the full kitchen menu while dining with us and build your feast.",
        }
      : {
          eyebrow: "Order online",
          title: "BUILD YOUR FEAST",
          description: "Choose. Customize. Confirm. Pay. We will notify the kitchen.",
        };
  return (
    <>
      <div className="order-intro">
        <div>
          {intro ? (
            <>
              <p className="eyebrow">{intro.eyebrow}</p>
              <h1>{intro.title}</h1>
              <p>{intro.description}</p>
            </>
          ) : (
            <>
              <p className="eyebrow">{table ? `Table ${table} digital menu` : "Order online"}</p>
              <h1>{table ? `ORDERING FOR TABLE ${table}` : "BUILD YOUR FEAST"}</h1>
              <p>
                {table
                  ? "Your order will go directly to the shared demo kitchen dashboard."
                  : "Choose. Customize. Confirm. Pay. We’ll notify the kitchen."}
              </p>
            </>
          )}
        </div>
        <div className="journey">
          {["Choose", "Customize", "Confirm", "Pay", "Notify"].map((x, i) => (
            <span key={x}>
              <b>{i + 1}</b>
              {x}
            </span>
          ))}
        </div>
      </div>
      <div className="menu-tools">
        <label>
          <FiSearch />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search seafood, sauces or dishes"
            aria-label="Search dishes"
          />
        </label>
      </div>
      <section className="menu-catalog-layout">
        <aside className="category-nav-shell" aria-label="Browse menu categories">
          <div className="category-nav-heading">
            <div className="category-heading-copy">
              <div className="category-heading-kicker">
                <span>Browse by</span>
                <small>{options.length} categories</small>
              </div>
              <strong>Menu categories</strong>
              <p>Find your next favorite.</p>
            </div>
            <small className="category-swipe">
              Swipe to browse <FiChevronRight />
            </small>
          </div>
          <div className="category-tabs">
            {options.map((c) => {
              const count = c === "All" ? menu.length : menu.filter((i) => i.category === c).length;
              const Icon = categoryIcons[c as keyof typeof categoryIcons] || FiGrid;
              return (
                <button
                  aria-pressed={category === c}
                  className={category === c ? "active" : ""}
                  onClick={() => setCategory(c)}
                  key={c}
                >
                  <i>
                    <Icon aria-hidden="true" />
                  </i>
                  <span>
                    {c}
                    <small>
                      {count} dish{count === 1 ? "" : "es"}
                    </small>
                  </span>
                  <FiChevronRight className="category-arrow" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </aside>
        <div className="catalog-results">
          <div className="catalog-results-heading" aria-live="polite">
            <div>
              <span>Currently showing</span>
              <h2>{category}</h2>
            </div>
            <small>
              {visible.length} dish{visible.length === 1 ? "" : "es"}
            </small>
          </div>
          {visible.length ? (
            <div className="product-grid">
              {visible.map((i) => (
                <AddCard item={i} key={i.id} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <FiSearch />
              <h2>No dishes found.</h2>
              <p>Try another search or category.</p>
              <button
                className="outline-button"
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
