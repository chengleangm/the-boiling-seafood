"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDemo } from "./demo-store";
import { FiCheck, FiSend } from "react-icons/fi";
export function Confirmation() {
  const id = useSearchParams().get("id") || "TBS-DEMO";
  const { orders } = useDemo();
  const o = orders.find((x) => x.id === id);
  return (
    <div className="confirmation">
      <span className="confirm-icon">
        <FiCheck />
      </span>
      <p className="eyebrow">Order received</p>
      <h1>
        LET’S GET
        <br />
        CRACKING.
      </h1>
      <p>
        Your demo order <strong>{id}</strong> has reached the admin and simulated kitchen workflow.
      </p>
      <div className="confirm-cards">
        <article>
          <span>Payment</span>
          <b>{o?.payment || "Paid"}</b>
        </article>
        <article>
          <span>Estimated time</span>
          <b>{o?.channel === "Delivery" ? "35–45 min" : "20–30 min"}</b>
        </article>
        <article>
          <span>Channel</span>
          <b>{o?.channel || "Online"}</b>
        </article>
      </div>
      <div className="telegram">
        <FiSend />
        <div>
          <b>Telegram notification simulated successfully.</b>
          <span>
            New order {id} · {o?.channel} · {o?.customer} ·{" "}
            {o?.items.map((i) => `${i.qty}× ${i.name}`).join(", ")} · ${o?.total.toFixed(2)} ·{" "}
            {o?.payment} · {o?.time}
          </span>
        </div>
      </div>
      <div className="confirm-actions">
        <Link className="red-button" href={`/track-order?id=${id}`}>
          Track order
        </Link>
      </div>
    </div>
  );
}
