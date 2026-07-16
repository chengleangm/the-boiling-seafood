"use client";
import { useState, useSyncExternalStore } from "react";
import { useDemo } from "./demo-store";
import { useRouter } from "next/navigation";
import { DemoOrder } from "@/lib/demo-data";
export function CheckoutFlow({ table }: { table?: number }) {
  const { cart, submit, clear } = useDemo();
  const router = useRouter();
  const [channel, setChannel] = useState<DemoOrder["channel"]>(table ? "Table QR" : "Delivery"),
    [payment, setPayment] = useState(table ? "Pay at restaurant" : "ABA PayWay"),
    [failed, setFailed] = useState(false),
    [validation, setValidation] = useState("");
  const promo = useSyncExternalStore(
    () => () => {},
    () => sessionStorage.getItem("tbs-promo") === "BOILING10",
    () => false,
  );
  const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0),
    delivery = channel === "Delivery" ? 2.5 : 0,
    discount = promo ? subtotal * 0.1 : 0,
    total = subtotal + delivery - discount;
  function finish(success: boolean) {
    const form = document.querySelector<HTMLFormElement>("#checkout-form");
    if (!form?.reportValidity()) {
      setValidation("Please complete the required guest details.");
      return;
    }
    setValidation("");
    if (!success) {
      setFailed(true);
      return;
    }
    const id = `TBS-${Date.now().toString().slice(-8)}`;
    submit({
      id,
      channel,
      customer: table
        ? `Table ${table}`
        : document.querySelector<HTMLInputElement>("#customer")?.value || "Demo Guest",
      table,
      items: cart,
      total,
      payment:
        channel === "Table QR" || payment.includes("Cash") || payment.includes("restaurant")
          ? "Pending"
          : "Paid",
      status: "New",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    clear();
    sessionStorage.removeItem("tbs-promo");
    sessionStorage.setItem("tbs-last-order", id);
    router.push(`/order-confirmation?id=${id}`);
  }
  if (!cart.length)
    return (
      <div className="empty-state">
        <h2>Your cart is empty.</h2>
        <a className="red-button" href={table ? `/table/${table}` : "/order"}>
          Choose dishes
        </a>
      </div>
    );
  return (
    <div className="checkout-grid">
      <form id="checkout-form" className="checkout-form" onSubmit={(e) => e.preventDefault()}>
        <section>
          <p className="step-label">03 · Confirm</p>
          <h2>How would you like it?</h2>
          <div className="choice-row">
            {(table ? ["Table QR"] : ["Delivery", "Pickup"]).map((x) => (
              <button
                type="button"
                className={channel === x ? "active" : ""}
                onClick={() => {
                  setChannel(x as DemoOrder["channel"]);
                  setPayment(x === "Pickup" ? "Pay at restaurant" : "ABA PayWay");
                }}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
        </section>
        <section>
          <h2>{table ? `Table ${table} details` : "Guest details"}</h2>
          <label>
            Full name
            <input
              id="customer"
              required
              defaultValue={table ? `Table ${table}` : ""}
              placeholder="Your full name"
              disabled={!!table}
            />
          </label>
          {!table && (
            <>
              <label>
                Phone number
                <input required type="tel" placeholder="012 345 678" />
              </label>
              <label>
                Email address
                <input required type="email" placeholder="you@example.com" />
              </label>
            </>
          )}
          {channel === "Delivery" && (
            <>
              <label>
                Delivery address
                <textarea required placeholder="Street, sangkat and house number" />
              </label>
              <label>
                Additional directions
                <textarea placeholder="Landmark or delivery instructions" />
              </label>
            </>
          )}
          <label>
            Order notes
            <textarea placeholder="Anything the kitchen should know?" />
          </label>
          {validation && <p className="error-message">{validation}</p>}
        </section>
        <section>
          <p className="step-label">04 · Demo payment</p>
          <h2>Payment method</h2>
          <p className="demo-warning">Demo payment only—no real transaction will be processed.</p>
          <div className="choice-row">
            {[
              "ABA PayWay",
              "KHQR",
              ...(channel === "Delivery" ? ["Cash on delivery"] : []),
              ...(channel !== "Delivery" ? ["Pay at restaurant"] : []),
            ].map((x) => (
              <button
                type="button"
                className={payment === x ? "active" : ""}
                onClick={() => setPayment(x)}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
          {failed && (
            <p className="error-message">
              Demo payment failed. Nothing was charged. Check the details and retry.
            </p>
          )}
        </section>
      </form>
      <aside className="checkout-summary">
        <p className="eyebrow">Your order</p>
        {cart.map((i) => (
          <div key={i.id}>
            <span>
              {i.qty} × {i.name}
            </span>
            <strong>${(i.qty * i.price).toFixed(2)}</strong>
          </div>
        ))}
        <hr />
        <div>
          <span>Subtotal</span>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <div>
          <span>Delivery</span>
          <strong>${delivery.toFixed(2)}</strong>
        </div>
        {promo && (
          <div>
            <span>BOILING10</span>
            <strong>−${discount.toFixed(2)}</strong>
          </div>
        )}
        <div className="grand">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <button className="red-button" onClick={() => finish(true)}>
          Simulate Successful Payment
        </button>
        {!payment.includes("Cash") && !payment.includes("restaurant") && (
          <button className="text-button" onClick={() => finish(false)}>
            Simulate Failed Payment
          </button>
        )}
        <small>
          ABA PayWay, KHQR, Telegram, printing, SMS, delivery and kitchen integrations are
          simulated.
        </small>
      </aside>
    </div>
  );
}
