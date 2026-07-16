"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  CartItem,
  DemoOrder,
  menuItems,
  MenuItem,
  seedOrders,
  seedServiceRequests,
  ServiceRequest,
} from "@/lib/demo-data";
type Store = {
  cart: CartItem[];
  tableCarts: Record<number, CartItem[]>;
  orders: DemoOrder[];
  menu: MenuItem[];
  serviceRequests: ServiceRequest[];
  add: (i: CartItem) => void;
  qty: (id: string, n: number) => void;
  clear: () => void;
  addTableItem: (table: number, i: CartItem) => void;
  qtyTableItem: (table: number, id: string, n: number) => void;
  clearTableCart: (table: number) => void;
  submit: (o: DemoOrder) => void;
  updateOrder: (id: string, status: DemoOrder["status"]) => void;
  updatePayment: (id: string, payment: DemoOrder["payment"]) => void;
  updateOrderNote: (id: string, note: string) => void;
  updateMenu: (id: string, p: Partial<MenuItem>) => void;
  addMenu: (item: MenuItem) => void;
  deleteMenu: (id: string) => void;
  addServiceRequest: (r: ServiceRequest) => void;
  updateServiceRequest: (id: string, status: ServiceRequest["status"]) => void;
};
const C = createContext<Store | null>(null);
export function DemoStore({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]),
    [tableCarts, setTableCarts] = useState<Record<number, CartItem[]>>({}),
    [orders, setOrders] = useState(seedOrders),
    [menu, setMenu] = useState(menuItems),
    [serviceRequests, setServiceRequests] = useState(seedServiceRequests),
    [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const x = localStorage.getItem("tbs-demo");
      if (x) {
        const d = JSON.parse(x);
        setCart(d.cart || []);
        setTableCarts(d.tableCarts || {});
        setOrders(d.orders || seedOrders);
        setMenu(d.menu || menuItems);
        setServiceRequests(d.serviceRequests || seedServiceRequests);
      }
    } finally {
      setReady(true);
    }
  }, []);
  useEffect(() => {
    if (ready)
      localStorage.setItem(
        "tbs-demo",
        JSON.stringify({ cart, tableCarts, orders, menu, serviceRequests }),
      );
  }, [cart, tableCarts, orders, menu, serviceRequests, ready]);
  const merge = (items: CartItem[], i: CartItem) => {
    const x = items.find(
      (v) =>
        v.id === i.id &&
        v.size === i.size &&
        v.spice === i.spice &&
        v.sauce === i.sauce &&
        v.notes === i.notes,
    );
    return x ? items.map((v) => (v === x ? { ...v, qty: v.qty + i.qty } : v)) : [...items, i];
  };
  return (
    <C.Provider
      value={{
        cart,
        tableCarts,
        orders,
        menu,
        serviceRequests,
        add: (i) => setCart((c) => merge(c, i)),
        qty: (id, n) =>
          setCart((c) =>
            c.map((v) => (v.id === id ? { ...v, qty: n } : v)).filter((v) => v.qty > 0),
          ),
        clear: () => setCart([]),
        addTableItem: (table, i) =>
          setTableCarts((c) => ({ ...c, [table]: merge(c[table] || [], i) })),
        qtyTableItem: (table, id, n) =>
          setTableCarts((c) => ({
            ...c,
            [table]: (c[table] || [])
              .map((v) => (v.id === id ? { ...v, qty: n } : v))
              .filter((v) => v.qty > 0),
          })),
        clearTableCart: (table) => setTableCarts((c) => ({ ...c, [table]: [] })),
        submit: (o) => setOrders((v) => [o, ...v]),
        updateOrder: (id, status) =>
          setOrders((v) => v.map((o) => (o.id === id ? { ...o, status } : o))),
        updatePayment: (id, payment) =>
          setOrders((v) => v.map((o) => (o.id === id ? { ...o, payment } : o))),
        updateOrderNote: (id, internalNote) =>
          setOrders((v) => v.map((o) => (o.id === id ? { ...o, internalNote } : o))),
        updateMenu: (id, p) => setMenu((v) => v.map((i) => (i.id === id ? { ...i, ...p } : i))),
        addMenu: (item) => setMenu((v) => [item, ...v]),
        deleteMenu: (id) => setMenu((v) => v.filter((i) => i.id !== id)),
        addServiceRequest: (r) => setServiceRequests((v) => [r, ...v]),
        updateServiceRequest: (id, status) =>
          setServiceRequests((v) => v.map((r) => (r.id === id ? { ...r, status } : r))),
      }}
    >
      {children}
    </C.Provider>
  );
}
export function useDemo() {
  const v = useContext(C);
  if (!v) throw new Error("DemoStore missing");
  return v;
}
