"use client";
import { useSearchParams } from "next/navigation";
import { useDemo } from "./demo-store";
const steps = ["New", "Confirmed", "Preparing", "Ready", "Out for delivery", "Completed"];
export function Tracking() {
  const id = useSearchParams().get("id") || "";
  const { orders } = useDemo();
  const o = orders.find((x) => x.id === id);
  const n = o ? Math.max(0, steps.indexOf(o.status)) : 0;
  return (
    <div className="tracking">
      <p className="eyebrow">Live demo status</p>
      <h1>TRACK YOUR FEAST</h1>
      {!o ? (
        <p>Order not found in this browser. Submit a demo order first.</p>
      ) : (
        <>
          <div className="tracking-head">
            <div>
              <span>Order</span>
              <b>{o.id}</b>
            </div>
            <div>
              <span>Channel</span>
              <b>{o.channel}</b>
            </div>
            <div>
              <span>Estimate</span>
              <b>25–35 min</b>
            </div>
          </div>
          <div className="track-line">
            {steps
              .filter((x) => o.channel === "Delivery" || x !== "Out for delivery")
              .map((x, i) => (
                <div className={i <= n ? "done" : ""} key={x}>
                  <i />
                  <span>{x}</span>
                </div>
              ))}
          </div>
          <p className="demo-warning">
            Live kitchen integration, SMS and real delivery location are simulated in this demo.
          </p>
        </>
      )}
    </div>
  );
}
