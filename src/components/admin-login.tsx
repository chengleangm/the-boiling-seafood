"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
export function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (
      data.get("email") === "admin@theboilingseafood.demo" &&
      data.get("password") === "Demo1234"
    ) {
      sessionStorage.setItem("tbs-admin", "true");
      router.push("/admin");
    } else setError("Incorrect demo credentials. Use the details shown below.");
  }
  return (
    <main className="admin-login">
      <form onSubmit={submit}>
        <p className="eyebrow">Interactive Demo</p>
        <h1>
          RESTAURANT
          <br />
          CONTROL ROOM
        </h1>
        <p>Demo access only—no real restaurant data.</p>
        <label>
          Email
          <input name="email" type="email" required defaultValue="admin@theboilingseafood.demo" />
        </label>
        <label>
          Password
          <input name="password" type="password" required defaultValue="Demo1234" />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button className="red-button">Enter demo dashboard</button>
        <small>admin@theboilingseafood.demo · Demo1234</small>
      </form>
    </main>
  );
}
