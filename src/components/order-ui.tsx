"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDemo } from "./demo-store";
import { MenuItem } from "@/lib/demo-data";
import { FiArrowUpRight, FiCheck, FiMinus, FiPlus, FiShoppingBag, FiX } from "react-icons/fi";
export function CartLink() {
  const { cart } = useDemo();
  return (
    <Link
      className="cart-link"
      href="/cart"
      aria-label={`Cart with ${cart.reduce((a, b) => a + b.qty, 0)} items`}
    >
      <FiShoppingBag />
      <span>{cart.reduce((a, b) => a + b.qty, 0)}</span>
    </Link>
  );
}
export function AddCard({ item }: { item: MenuItem }) {
  const { add } = useDemo();
  const [details, setDetails] = useState(false),
    [added, setAdded] = useState(false);

  useEffect(() => {
    if (!details) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetails(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [details]);

  function addToCart() {
    add({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1,
      size: "Regular",
      spice: "Medium",
      sauce: "House preparation",
      notes: "",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }
  return (
    <>
      <article className={`product-card ${!item.available ? "product-unavailable" : ""}`}>
        <button
          className="product-photo"
          onClick={() => setDetails(true)}
          aria-label={`View details for ${item.name}`}
        >
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 600px) 140px, (max-width: 1100px) 50vw, 25vw"
            className="product-card-image"
          />
          <div className="product-photo-badges">
            <span className="product-category">{item.category}</span>
            {item.popular && <b>Chef’s pick</b>}
          </div>
          {!item.available && <em>Unavailable</em>}
          <i className="photo-view">
            <FiArrowUpRight />
          </i>
        </button>
        <div className="product-copy">
          <div className="product-card-meta">
            <span className={item.available ? "available" : "unavailable"}>
              {item.available ? <FiCheck /> : <FiX />}
              {item.available ? "Available today" : "Unavailable"}
            </span>
            <strong className="product-price">${item.price.toFixed(2)}</strong>
          </div>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <div className="product-actions">
            <button className="details-button" onClick={() => setDetails(true)}>
              Details <FiArrowUpRight />
            </button>
            <button
              disabled={!item.available}
              className={`add-button ${added ? "added" : ""}`}
              onClick={addToCart}
            >
              {added ? (
                <>
                  <FiCheck /> Added
                </>
              ) : (
                "Add to cart"
              )}
            </button>
          </div>
        </div>
      </article>
      {details &&
        createPortal(
          <div className="modal-backdrop product-detail-backdrop" onClick={() => setDetails(false)}>
            <section
              className="product-detail-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={`product-detail-title-${item.id}`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setDetails(false)}
                aria-label="Close product details"
              >
                <FiX />
              </button>
              <div className="product-detail-image">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width:600px) 100vw, 520px"
                  className="cover"
                />
              </div>
              <div className="product-detail-copy">
                <span>
                  {item.category}
                  {item.popular && " · Chef’s pick"}
                </span>
                <h2 id={`product-detail-title-${item.id}`}>{item.name}</h2>
                <p>{item.description}</p>
                <div className="product-detail-meta">
                  <div>
                    <small>Price</small>
                    <strong>${item.price.toFixed(2)}</strong>
                  </div>
                  <div>
                    <small>Availability</small>
                    <strong>{item.available ? "Available today" : "Currently unavailable"}</strong>
                  </div>
                </div>
                <button
                  disabled={!item.available}
                  className={`red-button ${added ? "added" : ""}`}
                  onClick={addToCart}
                >
                  {added ? (
                    <>
                      <FiCheck /> Added to cart
                    </>
                  ) : (
                    <>
                      <FiShoppingBag /> Add to cart · ${item.price.toFixed(2)}
                    </>
                  )}
                </button>
                <small className="default-prep">
                  Regular house preparation. You can change quantity in the cart.
                </small>
              </div>
            </section>
          </div>,
          document.body,
        )}
    </>
  );
}
export function CartPanel() {
  const { cart, qty, clear } = useDemo();
  const [code, setCode] = useState(""),
    [applied, setApplied] = useState(false),
    [message, setMessage] = useState("");
  const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0),
    discount = applied ? subtotal * 0.1 : 0;
  function apply() {
    if (code.trim().toUpperCase() === "BOILING10") {
      setApplied(true);
      setMessage("BOILING10 applied — 10% demo discount.");
      sessionStorage.setItem("tbs-promo", "BOILING10");
    } else {
      setApplied(false);
      setMessage("That demo code is not valid.");
      sessionStorage.removeItem("tbs-promo");
    }
  }
  return (
    <div className="cart-panel">
      {!cart.length ? (
        <div className="empty-state">
          <FiShoppingBag />
          <h2>Your bag is waiting.</h2>
          <p>Add a seafood feast from our menu.</p>
          <Link className="red-button" href="/order">
            Browse menu
          </Link>
        </div>
      ) : (
        <>
          {cart.map((i) => (
            <article className="cart-row" key={i.id}>
              <div>
                <h3>{i.name}</h3>
                <p>
                  {i.size} · {i.spice} · {i.sauce}
                </p>
                {i.notes && <small>“{i.notes}”</small>}
              </div>
              <div className="qty">
                <button aria-label={`Decrease ${i.name}`} onClick={() => qty(i.id, i.qty - 1)}>
                  <FiMinus />
                </button>
                <span>{i.qty}</span>
                <button aria-label={`Increase ${i.name}`} onClick={() => qty(i.id, i.qty + 1)}>
                  <FiPlus />
                </button>
              </div>
              <strong>${(i.price * i.qty).toFixed(2)}</strong>
            </article>
          ))}
          <div className="cart-actions">
            <button
              onClick={() => {
                if (confirm("Clear every item from your cart?")) clear();
              }}
            >
              Clear cart
            </button>
            <Link href="/order">Continue ordering</Link>
          </div>
          <div className="promo-box">
            <label>
              Demo promotion code
              <div>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Try BOILING10"
                />
                <button onClick={apply}>Apply code</button>
              </div>
            </label>
            {message && <p className={applied ? "promo-success" : "error-message"}>{message}</p>}
          </div>
          <div className="cart-summary">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
            {applied && (
              <>
                <span>BOILING10</span>
                <strong>−${discount.toFixed(2)}</strong>
              </>
            )}
            <span>Estimated total</span>
            <strong>${(subtotal - discount).toFixed(2)}</strong>
            <p>Delivery fee is calculated at checkout.</p>
            <Link className="red-button" href="/checkout">
              Continue to checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
