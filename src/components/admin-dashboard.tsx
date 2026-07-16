/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import { useState } from "react";
import { useDemo } from "./demo-store";
import { DemoOrder, MenuItem, categories } from "@/lib/demo-data";
import { TableQr, downloadTableQr } from "./table-qr";
import {
  FiBarChart2,
  FiBell,
  FiGrid,
  FiLogOut,
  FiPlus,
  FiSearch,
  FiSend,
  FiTrash2,
} from "react-icons/fi";
const sections = [
  ["Overview", ""],
  ["Orders", "orders"],
  ["Menu", "menu"],
  ["Categories", "categories"],
  ["Promotions", "promotions"],
  ["Table QR", "tables"],
  ["Payments", "payments"],
  ["Reservations", "reservations"],
  ["Customers", "customers"],
  ["Reports", "reports"],
  ["Gallery", "gallery"],
  ["Website Content", "content"],
  ["Settings", "settings"],
];
const statuses: DemoOrder["status"][] = [
  "New",
  "Confirmed",
  "Preparing",
  "Ready",
  "Out for delivery",
  "Completed",
  "Cancelled",
];
const payments: DemoOrder["payment"][] = ["Unpaid", "Pending", "Paid", "Failed", "Refunded"];
const statusLabel = (s: DemoOrder["status"], table = false) =>
  table
    ? {
        New: "Order Received",
        Confirmed: "Confirmed",
        Preparing: "Preparing",
        Ready: "Ready to Serve",
        Completed: "Served",
        Cancelled: "Cancelled",
        "Out for delivery": "Out for delivery",
      }[s]
    : s;
export function AdminDashboard({ initialTab = "Overview" }: { initialTab?: string }) {
  const store = useDemo();
  const {
    orders,
    menu,
    serviceRequests,
    updateOrder,
    updatePayment,
    updateMenu,
    addMenu,
    deleteMenu,
  } = store;
  const [query, setQuery] = useState("");
  const today = orders.slice(0, 8),
    sales = today.reduce((a, b) => a + b.total, 0);
  function logout() {
    sessionStorage.removeItem("tbs-admin");
    location.href = "/admin/login";
  }
  function addProduct() {
    const name = prompt("Demo product name");
    if (!name) return;
    const price = Number(prompt("Price in USD", "12"));
    if (!Number.isFinite(price)) return;
    const item: MenuItem = {
      id: `custom-${Date.now()}`,
      name,
      category: "Seafood Boils",
      description: "New demo menu item. Edit details during production setup.",
      price,
      image: "/images/seafood-feast.png",
      available: true,
    };
    addMenu(item);
  }
  return (
    <main className="admin-shell">
      <aside>
        <Link href="/" className="admin-brand">
          TBS <span>Admin demo</span>
        </Link>
        {sections.map(([label, path]) => (
          <Link
            className={initialTab === label ? "active" : ""}
            href={`/admin${path ? `/${path}` : ""}`}
            key={label}
          >
            {label}
          </Link>
        ))}
        <button onClick={logout}>
          <FiLogOut /> Log out
        </button>
      </aside>
      <section className="admin-main">
        <header>
          <div>
            <p>THE BOILING SEAFOOD</p>
            <h1>{initialTab}</h1>
          </div>
          <div className="admin-tools">
            <label>
              <FiSearch />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search demo data"
              />
            </label>
            <button
              onClick={() =>
                alert(
                  `${serviceRequests.filter((r) => r.status === "New").length} new service request(s).`,
                )
              }
              aria-label="Notifications"
            >
              <FiBell />
            </button>
            <span className="admin-avatar">AD</span>
          </div>
        </header>
        {initialTab === "Overview" && <Overview orders={orders} sales={sales} />}{" "}
        {initialTab === "Orders" && (
          <>
            <OrderTable
              orders={orders.filter((o) =>
                `${o.id} ${o.customer} ${o.channel}`.toLowerCase().includes(query.toLowerCase()),
              )}
            />
            <ServiceRequests />
          </>
        )}{" "}
        {initialTab === "Menu" && (
          <div className="panel">
            <div className="panel-title">
              <div>
                <h2>Menu management</h2>
                <p>Local changes immediately appear on the customer and table menus.</p>
              </div>
              <button className="red-button" onClick={addProduct}>
                <FiPlus /> Add Menu Item
              </button>
            </div>
            <div className="menu-admin">
              {menu
                .filter((i) => i.name.toLowerCase().includes(query.toLowerCase()))
                .map((i) => (
                  <article key={i.id}>
                    <div>
                      <b>{i.name}</b>
                      <span>
                        {i.category} · ${i.price.toFixed(2)}
                      </span>
                    </div>
                    <label>
                      Price{" "}
                      <input
                        aria-label={`${i.name} price`}
                        type="number"
                        value={i.price}
                        onChange={(e) => updateMenu(i.id, { price: Number(e.target.value) })}
                      />
                    </label>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={i.available}
                        onChange={(e) => updateMenu(i.id, { available: e.target.checked })}
                      />
                      <span />
                      Available
                    </label>
                    <button onClick={() => updateMenu(i.id, { popular: !i.popular })}>
                      {i.popular ? "★ Popular" : "☆ Mark popular"}
                    </button>
                    <button
                      aria-label={`Delete ${i.name}`}
                      onClick={() =>
                        confirm(`Delete ${i.name} from this demo?`) && deleteMenu(i.id)
                      }
                    >
                      <FiTrash2 />
                    </button>
                  </article>
                ))}
            </div>
          </div>
        )}{" "}
        {initialTab === "Categories" && (
          <div className="category-admin">
            {categories.map((c) => (
              <article className="panel" key={c}>
                <b>{c}</b>
                <span>{menu.filter((i) => i.category === c).length} products</span>
                <button onClick={() => alert(`${c} category editor opened in demo mode.`)}>
                  Edit
                </button>
              </article>
            ))}
          </div>
        )}{" "}
        {initialTab === "Promotions" && <Promotions />}{" "}
        {initialTab === "Table QR" && <TableManager />} {initialTab === "Reports" && <Reports />}{" "}
        {initialTab === "Payments" && <OrderTable orders={orders} />}{" "}
        {["Reservations", "Customers", "Gallery", "Website Content", "Settings"].includes(
          initialTab,
        ) && <DemoWorkspace title={initialTab} />}
        <div className="telegram-admin">
          <FiSend />
          <span>
            <b>Restaurant notification simulation</b>Table, delivery and pickup orders share one
            kitchen queue. No external message is sent.
          </span>
        </div>
      </section>
    </main>
  );
}
function Overview({ orders, sales }: { orders: DemoOrder[]; sales: number }) {
  const { serviceRequests } = useDemo();
  return (
    <>
      <div className="metrics">
        <article>
          <span>Orders today</span>
          <b>{orders.slice(0, 8).length}</b>
          <small>+18% vs yesterday</small>
        </article>
        <article>
          <span>Sales today</span>
          <b>${sales.toFixed(0)}</b>
          <small>Demo gross sales</small>
        </article>
        <article>
          <span>Active tables</span>
          <b>
            {
              new Set(orders.filter((x) => x.table && x.status !== "Completed").map((x) => x.table))
                .size
            }
          </b>
          <small>Table QR orders</small>
        </article>
        <article>
          <span>Need attention</span>
          <b>
            {orders.filter((x) => x.status === "New").length +
              serviceRequests.filter((r) => r.status === "New").length}
          </b>
          <small>Orders + staff requests</small>
        </article>
      </div>
      <div className="quick-actions">
        {[
          ["Add Menu Item", "/admin/menu"],
          ["View New Orders", "/admin/orders"],
          ["Create Promotion", "/admin/promotions"],
          ["Generate Table QR", "/admin/tables"],
          ["View Sales Report", "/admin/reports"],
        ].map(([x, p]) => (
          <Link key={x} href={p}>
            {x}
          </Link>
        ))}
      </div>
      <div className="admin-columns">
        <article className="panel">
          <div className="panel-title">
            <h2>Sales this week</h2>
            <FiBarChart2 />
          </div>
          <div className="bar-chart">
            {[42, 65, 55, 78, 70, 92, 82].map((n, i) => (
              <div key={i}>
                <span style={{ height: `${n}%` }} />
                <small>{["M", "T", "W", "T", "F", "S", "S"][i]}</small>
              </div>
            ))}
          </div>
        </article>
        <article className="panel">
          <h2>Orders by channel</h2>
          {["Delivery", "Pickup", "Table QR"].map((x, i) => (
            <div className="channel-row" key={x}>
              <span>{x}</span>
              <div>
                <i style={{ width: `${[68, 45, 56][i]}%` }} />
              </div>
              <b>{orders.filter((o) => o.channel === x).length}</b>
            </div>
          ))}
        </article>
      </div>
      <OrderTable orders={orders.slice(0, 6)} />
      <ServiceRequests compact />
    </>
  );
}
function OrderTable({ orders }: { orders: DemoOrder[] }) {
  const { updateOrder, updatePayment, updateOrderNote } = useDemo();
  return (
    <div className="panel order-table">
      <div className="panel-title">
        <h2>Orders</h2>
        <span>{orders.length} records</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Channel</th>
              <th>Customer / table</th>
              <th>Products</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>
                  <b>{o.id}</b>
                  <small>{o.time}</small>
                </td>
                <td>
                  <span className={`channel-badge ${o.channel.toLowerCase().replace(" ", "-")}`}>
                    {o.channel}
                  </span>
                </td>
                <td>{o.table ? `Table ${o.table}` : o.customer}</td>
                <td>
                  {o.items.map((i) => (
                    <small key={i.id}>
                      {i.qty}× {i.name}
                      <br />
                      {i.size} · {i.spice} · {i.sauce}
                      {i.notes && (
                        <>
                          <br />
                          Note: {i.notes}
                        </>
                      )}
                    </small>
                  ))}
                </td>
                <td>${o.total.toFixed(2)}</td>
                <td>
                  <small>{o.paymentMethod}</small>
                  <select
                    value={o.payment}
                    onChange={(e) => updatePayment(o.id, e.target.value as DemoOrder["payment"])}
                  >
                    {payments.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    value={o.status}
                    onChange={(e) => updateOrder(o.id, e.target.value as DemoOrder["status"])}
                  >
                    {statuses
                      .filter((s) => o.channel !== "Table QR" || s !== "Out for delivery")
                      .map((s) => (
                        <option value={s} key={s}>
                          {statusLabel(s, o.channel === "Table QR")}
                        </option>
                      ))}
                  </select>
                </td>
                <td>
                  <button
                    onClick={() =>
                      alert(
                        `${o.id}\n${o.items.map((i) => `${i.qty} × ${i.name}\n${i.size} · ${i.spice} · ${i.sauce}\n${i.notes}`).join("\n")}\nTotal: $${o.total.toFixed(2)}\n\nReceipt printing is simulated.`,
                      )
                    }
                  >
                    Details / receipt
                  </button>
                  <button
                    onClick={() => {
                      const note = prompt(`Internal note for ${o.id}`, o.internalNote || "");
                      if (note !== null) updateOrderNote(o.id, note);
                    }}
                  >
                    {o.internalNote ? "Edit note" : "Add note"}
                  </button>
                  {o.status !== "Completed" && (
                    <button onClick={() => updateOrder(o.id, "Completed")}>
                      {o.channel === "Table QR" ? "Mark Served" : "Complete"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function ServiceRequests({ compact = false }: { compact?: boolean }) {
  const { serviceRequests, updateServiceRequest } = useDemo();
  const list = compact ? serviceRequests.slice(0, 3) : serviceRequests;
  return (
    <div className="panel service-admin">
      <div className="panel-title">
        <h2>Active service requests</h2>
        <span>{serviceRequests.filter((r) => r.status !== "Completed").length} active</span>
      </div>
      {list.map((r) => (
        <article key={r.id}>
          <div>
            <b>
              Table {r.table} · {r.type}
            </b>
            <span>
              {r.id} · {r.time}
            </span>
          </div>
          <select
            value={r.status}
            onChange={(e) => updateServiceRequest(r.id, e.target.value as typeof r.status)}
          >
            <option>New</option>
            <option>Acknowledged</option>
            <option>Completed</option>
          </select>
        </article>
      ))}
    </div>
  );
}
function TableManager() {
  const { orders, serviceRequests, updateOrder, updatePayment } = useDemo();
  const [tables, setTables] = useState(
    Array.from({ length: 10 }, (_, i) => ({ id: i + 1, active: true })),
  );
  function add() {
    const value = Number(prompt("New table number", String(tables.length + 1)));
    if (value > 0 && !tables.some((t) => t.id === value))
      setTables((v) => [...v, { id: value, active: true }].sort((a, b) => a.id - b.id));
  }
  function edit(old: number) {
    const value = Number(prompt("Edit table number", String(old)));
    if (value > 0 && !tables.some((t) => t.id === value))
      setTables((v) => v.map((t) => (t.id === old ? { ...t, id: value } : t)));
  }
  function close(table: number) {
    if (!confirm(`Close Table ${table} after payment?`)) return;
    orders
      .filter((o) => o.table === table && o.status !== "Cancelled")
      .forEach((o) => {
        updateOrder(o.id, "Completed");
        updatePayment(o.id, "Paid");
      });
  }
  return (
    <>
      <div className="table-admin-head">
        <div>
          <h2>Restaurant tables</h2>
          <p>QR URLs use the current deployed domain automatically.</p>
        </div>
        <button className="red-button" onClick={add}>
          <FiPlus /> Add table
        </button>
      </div>
      <div className="qr-grid table-management">
        {tables.map((t) => {
          const activeOrders = orders.filter(
            (o) => o.table === t.id && !["Completed", "Cancelled"].includes(o.status),
          );
          const bill = activeOrders.reduce((a, b) => a + b.total, 0);
          return (
            <article key={t.id}>
              <TableQr table={t.id} />
              <h3>Table {t.id}</h3>
              <button
                className={`status ${t.active ? "paid" : "pending"}`}
                onClick={() =>
                  setTables((v) => v.map((x) => (x.id === t.id ? { ...x, active: !x.active } : x)))
                }
              >
                {t.active ? "Active" : "Inactive"}
              </button>
              <dl>
                <div>
                  <dt>Current status</dt>
                  <dd>
                    {activeOrders[0]
                      ? statusLabel(activeOrders[0].status, true)
                      : "No current order"}
                  </dd>
                </div>
                <div>
                  <dt>Active orders</dt>
                  <dd>{activeOrders.length}</dd>
                </div>
                <div>
                  <dt>Bill total</dt>
                  <dd>${bill.toFixed(2)}</dd>
                </div>
                <div>
                  <dt>Staff requests</dt>
                  <dd>
                    {
                      serviceRequests.filter((r) => r.table === t.id && r.status !== "Completed")
                        .length
                    }
                  </dd>
                </div>
              </dl>
              <div className="table-admin-actions">
                <Link href={`/table/${t.id}`}>Open menu</Link>
                <button onClick={() => downloadTableQr(t.id)}>Download QR</button>
                <button onClick={() => window.print()}>Print QR</button>
                <button onClick={() => edit(t.id)}>Edit number</button>
                {activeOrders.length > 0 && (
                  <>
                    <Link href="/admin/orders">View orders</Link>
                    <button onClick={() => close(t.id)}>Close table</button>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <ServiceRequests />
    </>
  );
}
function Promotions() {
  const [items, setItems] = useState([
    { title: "20% Weekday Boils", code: "BOIL20", active: true },
    { title: "Family Feast Bonus", code: "FAMILY", active: true },
    { title: "Pickup $5 Off", code: "PICKUP5", active: false },
  ]);
  function add() {
    const title = prompt("Promotion title");
    if (title) setItems((v) => [...v, { title, code: "NEWDEMO", active: true }]);
  }
  return (
    <div className="panel">
      <div className="panel-title">
        <h2>Promotion management</h2>
        <button className="red-button" onClick={add}>
          <FiPlus /> Create promotion
        </button>
      </div>
      <div className="promotion-admin">
        {items.map((p, i) => (
          <article key={`${p.code}-${i}`}>
            <div>
              <b>{p.title}</b>
              <span>Code: {p.code} · Percentage discount · Demo dates</span>
            </div>
            <label>
              <input
                type="checkbox"
                checked={p.active}
                onChange={() =>
                  setItems((v) => v.map((x, j) => (j === i ? { ...x, active: !x.active } : x)))
                }
              />{" "}
              Active
            </label>
            <button
              onClick={() => {
                const title = prompt("Edit promotion title", p.title);
                if (title) setItems((v) => v.map((x, j) => (j === i ? { ...x, title } : x)));
              }}
            >
              Edit
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
function Reports() {
  return (
    <>
      <div className="metrics">
        <article>
          <span>Average order</span>
          <b>$52.40</b>
          <small>+6.2% this month</small>
        </article>
        <article>
          <span>Monthly sales</span>
          <b>$18.6k</b>
          <small>357 demo orders</small>
        </article>
        <article>
          <span>Top product</span>
          <b>Signature</b>
          <small>82 units sold</small>
        </article>
        <article>
          <span>Paid orders</span>
          <b>84%</b>
          <small>Demo payments</small>
        </article>
      </div>
      <div className="panel report-panel">
        <h2>Daily · Weekly · Monthly sales</h2>
        <div className="bar-chart large">
          {[35, 49, 44, 68, 58, 82, 75, 64, 88, 72, 92, 85].map((n, i) => (
            <div key={i}>
              <span style={{ height: `${n}%` }} />
              <small>{i + 1}</small>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
function DemoWorkspace({ title }: { title: string }) {
  return (
    <div className="panel placeholder-panel">
      <FiGrid />
      <h2>{title} workspace</h2>
      <p>
        Realistic sample records are available in this sales demo. Production will connect secure
        restaurant data and permissions.
      </p>
      <button className="red-button" onClick={() => alert(`${title} demo action completed.`)}>
        Try demo action
      </button>
    </div>
  );
}
