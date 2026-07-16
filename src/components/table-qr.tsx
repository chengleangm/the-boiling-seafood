/* QR data URLs are already final generated images and should not be re-optimized. */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
export function TableQr({ table, size = 150 }: { table: number; size?: number }) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    let active = true;
    const url = `${location.origin}/table/${table}`;
    QRCode.toDataURL(url, {
      width: size,
      margin: 1,
      color: { dark: "#071b2d", light: "#ffffff" },
    }).then((data) => {
      if (active) setSrc(data);
    });
    return () => {
      active = false;
    };
  }, [table, size]);
  return src ? (
    <img
      className="real-table-qr"
      src={src}
      width={size}
      height={size}
      alt={`QR code for Table ${table}`}
    />
  ) : (
    <div className="qr-loading" style={{ width: size, height: size }}>
      Generating QR…
    </div>
  );
}
export async function downloadTableQr(table: number) {
  const url = `${location.origin}/table/${table}`;
  const data = await QRCode.toDataURL(url, { width: 640, margin: 2 });
  const a = document.createElement("a");
  a.href = data;
  a.download = `the-boiling-seafood-table-${table}.png`;
  a.click();
}
