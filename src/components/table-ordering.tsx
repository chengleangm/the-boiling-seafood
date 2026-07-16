/* Date/time IDs are created only inside confirmed click handlers. */
/* eslint-disable react-hooks/purity */
"use client";
import Image from "next/image";
import { useState } from "react";
import { useDemo } from "./demo-store";
import { CartItem, DemoOrder, MenuItem, ServiceRequest, categories } from "@/lib/demo-data";
import {
  FiArrowUp,
  FiCheck,
  FiChevronLeft,
  FiMinus,
  FiPlus,
  FiSearch,
  FiShoppingBag,
  FiUsers,
  FiX,
} from "react-icons/fi";
const tableStatuses = [
  { value: "New", label: "Order Received" },
  { value: "Confirmed", label: "Confirmed" },
  { value: "Preparing", label: "Preparing" },
  { value: "Ready", label: "Ready to Serve" },
  { value: "Completed", label: "Served" },
];
export function TableOrdering({ table }: { table: number }) {
  const {
    menu,
    tableCarts,
    orders,
    serviceRequests,
    addTableItem,
    qtyTableItem,
    clearTableCart,
    submit,
    addServiceRequest,
  } = useDemo();
  const cart = tableCarts[table] || [];
  const [category, setCategory] = useState("Popular"),
    [query, setQuery] = useState(""),
    [availableOnly, setAvailableOnly] = useState(false),
    [selected, setSelected] = useState<MenuItem | null>(null),
    [cartOpen, setCartOpen] = useState(false),
    [success, setSuccess] = useState<DemoOrder | null>(null),
    [notice, setNotice] = useState(""),
    [billOpen, setBillOpen] = useState(false);
  const tableOrders = orders.filter((o) => o.table === table);
  const currentTotal = tableOrders
    .filter((o) => o.status !== "Completed" && o.status !== "Cancelled")
    .reduce((a, b) => a + b.total, 0);
  const visible = menu.filter(
    (i) =>
      (category === "Popular" ? i.popular : category === "All" || i.category === category) &&
      (!availableOnly || i.available) &&
      `${i.name} ${i.description}`.toLowerCase().includes(query.toLowerCase()),
  );
  const count = cart.reduce((a, b) => a + b.qty, 0);
  function addItem(item: CartItem) {
    addTableItem(table, item);
    setSelected(null);
    setNotice(`${item.qty} × ${item.name} added to Table ${table}.`);
    setTimeout(() => setNotice(""), 2500);
  }
  function send() {
    if (!cart.length) return;
    if (!confirm(`Send this order for Table ${table} to the restaurant?`)) return;
    const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
    const order: DemoOrder = {
      id: `TB-${Date.now().toString().slice(-6)}`,
      channel: "Table QR",
      customer: `Table ${table}`,
      table,
      items: cart,
      total,
      payment: "Unpaid",
      paymentMethod: "Pay at Restaurant",
      status: "New",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    submit(order);
    clearTableCart(table);
    setCartOpen(false);
    setSuccess(order);
  }
  function request(type: ServiceRequest["type"]) {
    if (!confirm(`${type} for Table ${table}?`)) return;
    addServiceRequest({
      id: `SR-${Date.now().toString().slice(-6)}`,
      table,
      type,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "New",
    });
    setNotice(`Staff request received for Table ${table}. This is a demo interaction.`);
    if (type === "Request the Bill") setBillOpen(true);
    setTimeout(() => setNotice(""), 3500);
  }
  return (
    <main className="dine-menu" id="top">
      <TableHeader table={table} count={count} onCart={() => setCartOpen(true)} />
      {notice && (
        <div className="table-toast">
          <FiCheck />
          {notice}
        </div>
      )}
      <section className="dine-welcome">
        <div>
          <span className="dine-badge">Dine-In Menu</span>
          <p>Welcome to The Boiling Seafood</p>
          <h1>
            ORDERING FOR
            <br />
            TABLE {table}
          </h1>
          <small>Order from your phone and pay at the restaurant.</small>
        </div>
      </section>
      {tableOrders.length > 0 && (
        <section className="table-orders section-pad">
          <div className="dine-section-title">
            <div>
              <p className="eyebrow">Your table activity</p>
              <h2>Current orders</h2>
            </div>
            <span>
              {tableOrders.length} order{tableOrders.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="table-order-list">
            {tableOrders.map((o) => (
              <TableOrderStatus order={o} key={o.id} />
            ))}
          </div>
        </section>
      )}
      <section className="dine-catalog section-pad">
        <div className="dine-section-title">
          <div>
            <p className="eyebrow">Choose your catch</p>
            <h2>Fresh from the kitchen</h2>
          </div>
          <label className="available-toggle">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
            />{" "}
            Available only
          </label>
        </div>
        <div className="dine-search">
          <FiSearch />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the dine-in menu"
            aria-label="Search menu"
          />
        </div>
        <nav className="dine-categories" aria-label="Menu categories">
          {["Popular", "All", ...categories].map((c) => (
            <button
              className={category === c ? "active" : ""}
              onClick={() => setCategory(c)}
              key={c}
            >
              {c}
            </button>
          ))}
        </nav>
        {visible.length ? (
          <div className="dine-products">
            {visible.map((item) => (
              <TableProduct item={item} onOpen={() => setSelected(item)} key={item.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FiSearch />
            <h2>No dishes found.</h2>
            <button
              className="outline-button"
              onClick={() => {
                setQuery("");
                setCategory("Popular");
                setAvailableOnly(false);
              }}
            >
              Reset menu
            </button>
          </div>
        )}
      </section>
      <section className="table-help section-pad">
        <div>
          <p className="eyebrow light">Need Help?</p>
          <h2>WE’RE RIGHT HERE.</h2>
          <p>Send a demo request to restaurant staff for Table {table}.</p>
        </div>
        <div>
          {(
            [
              "Call Staff",
              "Request Water",
              "Request Cutlery",
              "Request the Bill",
            ] as ServiceRequest["type"][]
          ).map((x) => (
            <button onClick={() => request(x)} key={x}>
              <FiUsers />
              {x}
            </button>
          ))}
        </div>
        {serviceRequests.filter((r) => r.table === table && r.status !== "Completed").length >
          0 && (
          <p className="help-active">
            {serviceRequests.filter((r) => r.table === table && r.status !== "Completed").length}{" "}
            active staff request(s)
          </p>
        )}
      </section>
      <button
        className="back-top"
        onClick={() => document.querySelector("#top")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Return to top"
      >
        <FiArrowUp />
      </button>
      {count > 0 && (
        <button className="table-cart-float" onClick={() => setCartOpen(true)}>
          <FiShoppingBag />
          <span>
            View order · {count} item{count > 1 ? "s" : ""}
          </span>
          <b>${cart.reduce((a, b) => a + b.price * b.qty, 0).toFixed(2)}</b>
        </button>
      )}
      {selected && (
        <TableProductModal item={selected} onClose={() => setSelected(null)} onAdd={addItem} />
      )}{" "}
      {cartOpen && (
        <TableCart
          table={table}
          cart={cart}
          onClose={() => setCartOpen(false)}
          onQty={(id, n) => qtyTableItem(table, id, n)}
          onClear={() => clearTableCart(table)}
          onSend={send}
        />
      )}{" "}
      {success && <TableSuccess order={success} table={table} onClose={() => setSuccess(null)} />}{" "}
      {billOpen && (
        <BillPanel table={table} total={currentTotal} onClose={() => setBillOpen(false)} />
      )}
    </main>
  );
}
function TableHeader({
  table,
  count,
  onCart,
}: {
  table: number;
  count: number;
  onCart: () => void;
}) {
  return (
    <header className="dine-header">
      <div className="dine-logo">
        <Image src="/logo/logo (2).png" alt="The Boiling Seafood" width={140} height={62} />
      </div>
      <div className="dine-table-id">
        <span>Dine-In Menu</span>
        <b>Table {table}</b>
      </div>
      <div className="dine-head-actions">
        <span className="open-status">● Open</span>
        <select aria-label="Language">
          <option>EN</option>
          <option>ខ្មែរ</option>
        </select>
        <button onClick={onCart} aria-label={`Table cart with ${count} items`}>
          <FiShoppingBag />
          <i>{count}</i>
        </button>
      </div>
    </header>
  );
}
function TableProduct({ item, onOpen }: { item: MenuItem; onOpen: () => void }) {
  const spicy = ["Seafood Boils", "Shrimp", "Combo Sets"].includes(item.category);
  return (
    <article className={`dine-product ${!item.available ? "unavailable" : ""}`}>
      <div className="dine-product-image">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width:600px) 42vw, 300px"
          className="cover"
        />
        {item.popular && <span>Popular</span>}
        {spicy && <b>🌶 Spicy options</b>}
      </div>
      <div>
        <small>{item.category}</small>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <footer>
          <strong>${item.price.toFixed(2)}</strong>
          <button disabled={!item.available} onClick={onOpen}>
            {item.available ? "Add +" : "Unavailable"}
          </button>
        </footer>
      </div>
    </article>
  );
}
function TableProductModal({
  item,
  onClose,
  onAdd,
}: {
  item: MenuItem;
  onClose: () => void;
  onAdd: (i: CartItem) => void;
}) {
  const [size, setSize] = useState(""),
    [sauce, setSauce] = useState(""),
    [spice, setSpice] = useState(""),
    [qty, setQty] = useState(1),
    [notes, setNotes] = useState(""),
    [extras, setExtras] = useState<string[]>([]);
  const prices: Record<string, number> = {
    Large: 8,
    "Extra seafood": 12,
    "Extra corn": 2,
    "Extra potato": 2,
    "Extra sausage": 4,
  };
  const extraTotal = extras.reduce((a, b) => a + (prices[b] || 0), 0);
  const unit = item.price + (size === "Large" ? 8 : 0) + extraTotal,
    total = unit * qty;
  function toggle(x: string) {
    setExtras((v) => (v.includes(x) ? v.filter((e) => e !== x) : [...v, x]));
  }
  return (
    <div className="dine-modal-backdrop">
      <section className="dine-product-modal">
        <header>
          <button onClick={onClose} aria-label="Close">
            <FiChevronLeft />
          </button>
          <span>Customize your dish</span>
          <button onClick={onClose} aria-label="Close">
            <FiX />
          </button>
        </header>
        <div className="modal-food">
          <Image src={item.image} alt={item.name} fill sizes="100vw" className="cover" />
        </div>
        <div className="modal-food-copy">
          <p className="eyebrow">{item.category}</p>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <Option title="Choose a portion" required>
            {["Regular", "Large"].map((x) => (
              <button className={size === x ? "active" : ""} onClick={() => setSize(x)} key={x}>
                {x}
                {x === "Large" ? " +$8" : ""}
              </button>
            ))}
          </Option>
          <Option title="Choose your sauce" required>
            {["Signature Cajun", "Garlic Butter", "Lemon Pepper", "The Boiling Special"].map(
              (x) => (
                <button className={sauce === x ? "active" : ""} onClick={() => setSauce(x)} key={x}>
                  {x}
                </button>
              ),
            )}
          </Option>
          <Option title="Choose spice level" required>
            {["No Spice", "Mild", "Medium", "Hot", "Extra Hot"].map((x) => (
              <button className={spice === x ? "active" : ""} onClick={() => setSpice(x)} key={x}>
                {x}
              </button>
            ))}
          </Option>
          <Option title="Add extras">
            {["Extra seafood", "Extra corn", "Extra potato", "Extra sausage"].map((x) => (
              <button
                className={extras.includes(x) ? "active" : ""}
                onClick={() => toggle(x)}
                key={x}
              >
                {x} +${prices[x]}
              </button>
            ))}
          </Option>
          <label className="table-notes">
            Special instructions
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Allergies, preparation notes or requests"
            />
          </label>
          <div className="table-modal-footer">
            <div className="table-qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>
                <FiMinus />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>
                <FiPlus />
              </button>
            </div>
            <button
              disabled={!size || !sauce || !spice}
              onClick={() =>
                onAdd({
                  id: `${item.id}-${Date.now()}`,
                  name: item.name,
                  price: unit,
                  qty,
                  size,
                  spice,
                  sauce: `${sauce}${extras.length ? ` · ${extras.join(", ")}` : ""}`,
                  notes,
                })
              }
            >
              Add to Order · ${total.toFixed(2)}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
function Option({
  title,
  required,
  children,
}: {
  title: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="table-option">
      <legend>
        {title}
        {required && <span>Required</span>}
      </legend>
      <div>{children}</div>
    </fieldset>
  );
}
function TableCart({
  table,
  cart,
  onClose,
  onQty,
  onClear,
  onSend,
}: {
  table: number;
  cart: CartItem[];
  onClose: () => void;
  onQty: (id: string, n: number) => void;
  onClear: () => void;
  onSend: () => void;
}) {
  const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
  return (
    <div className="dine-modal-backdrop cart-backdrop">
      <aside className="table-cart">
        <header>
          <div>
            <span>Table {table}</span>
            <h2>Your Order</h2>
          </div>
          <button onClick={onClose} aria-label="Close cart">
            <FiX />
          </button>
        </header>
        <div className="table-cart-items">
          {cart.length ? (
            cart.map((i) => (
              <article key={i.id}>
                <div>
                  <h3>{i.name}</h3>
                  <p>
                    {i.size} · {i.spice}
                    <br />
                    {i.sauce}
                  </p>
                  {i.notes && <small>“{i.notes}”</small>}
                </div>
                <strong>${(i.price * i.qty).toFixed(2)}</strong>
                <div className="table-qty">
                  <button onClick={() => onQty(i.id, i.qty - 1)}>
                    <FiMinus />
                  </button>
                  <span>{i.qty}</span>
                  <button onClick={() => onQty(i.id, i.qty + 1)}>
                    <FiPlus />
                  </button>
                </div>
                <button className="remove-item" onClick={() => onQty(i.id, 0)}>
                  Remove
                </button>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <FiShoppingBag />
              <h2>No items yet.</h2>
              <button className="outline-button" onClick={onClose}>
                Browse menu
              </button>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <footer>
            <button
              className="clear-table-cart"
              onClick={() => confirm("Clear this table cart?") && onClear()}
            >
              Clear cart
            </button>
            <div>
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div>
              <span>Service charge</span>
              <strong>Calculated at restaurant</strong>
            </div>
            <div className="table-total">
              <span>Total</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <button className="send-kitchen" onClick={onSend}>
              Send Order to Kitchen
            </button>
            <button className="continue-table" onClick={onClose}>
              Continue browsing
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}
function TableSuccess({
  order,
  table,
  onClose,
}: {
  order: DemoOrder;
  table: number;
  onClose: () => void;
}) {
  return (
    <div className="dine-modal-backdrop">
      <section className="table-success">
        <span>
          <FiCheck />
        </span>
        <p className="eyebrow">Order received</p>
        <h2>Sent to the kitchen!</h2>
        <p>
          Your order has been sent successfully. The restaurant is preparing your order for Table{" "}
          {table}.
        </p>
        <div className="table-success-grid">
          <div>
            <small>Order</small>
            <b>{order.id}</b>
          </div>
          <div>
            <small>Status</small>
            <b>Order Received</b>
          </div>
          <div>
            <small>Payment</small>
            <b>Pay at Restaurant · Unpaid</b>
          </div>
          <div>
            <small>Estimate</small>
            <b>20–30 min</b>
          </div>
        </div>
        <div className="table-order-summary">
          {order.items.map((i) => (
            <span key={i.id}>
              {i.qty} × {i.name}
            </span>
          ))}
          <strong>Total · ${order.total.toFixed(2)}</strong>
        </div>
        <div className="restaurant-notify">
          <b>NEW TABLE ORDER · {order.id}</b>
          <span>
            Channel: Table QR · Table: {table} · ${order.total.toFixed(2)} · Status: New
          </span>
          <small>Restaurant notification simulated successfully.</small>
        </div>
        <button className="red-button" onClick={onClose}>
          Add More Items
        </button>
      </section>
    </div>
  );
}
function TableOrderStatus({ order }: { order: DemoOrder }) {
  const active = Math.max(
    0,
    tableStatuses.findIndex((x) => x.value === order.status),
  );
  return (
    <article className="table-order-status">
      <header>
        <div>
          <small>{order.time}</small>
          <h3>{order.id}</h3>
        </div>
        <div>
          <span>{order.paymentMethod || "Pay at Restaurant"}</span>
          <b>${order.total.toFixed(2)}</b>
        </div>
      </header>
      <div className="table-progress">
        {tableStatuses.map((s, i) => (
          <div className={i <= active ? "done" : ""} key={s.value}>
            <i />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <details>
        <summary>View {order.items.length} item(s)</summary>
        {order.items.map((i) => (
          <p key={i.id}>
            {i.qty} × {i.name} · {i.size} · {i.sauce}
            {i.notes ? ` · “${i.notes}”` : ""}
          </p>
        ))}
      </details>
    </article>
  );
}
function BillPanel({
  table,
  total,
  onClose,
}: {
  table: number;
  total: number;
  onClose: () => void;
}) {
  const [method, setMethod] = useState("Pay at Cashier");
  return (
    <div className="dine-modal-backdrop">
      <section className="bill-panel">
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>
        <p className="eyebrow">Table {table} bill request</p>
        <h2>Pay at Restaurant</h2>
        <div className="bill-total">
          <span>Current table total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <div className="bill-methods">
          {["Pay at Cashier", "Cash", "Card", "Demo KHQR"].map((x) => (
            <button className={method === x ? "active" : ""} onClick={() => setMethod(x)} key={x}>
              {x}
            </button>
          ))}
        </div>
        {method === "Demo KHQR" && (
          <p className="demo-warning">Demo payment only—no real transaction will be processed.</p>
        )}
        <p>Staff has been notified. Payment selection is for demonstration only.</p>
        <button className="red-button" onClick={onClose}>
          Done
        </button>
      </section>
    </div>
  );
}
