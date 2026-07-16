"use client";
import { FormEvent, useState } from "react";
import { FiCheck, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
export function ReservationForm() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }
  if (sent)
    return (
      <div className="form-success">
        <FiCheck />
        <h2>Table request received.</h2>
        <p>This is a demo confirmation. No real reservation was sent.</p>
        <button className="outline-button" onClick={() => setSent(false)}>
          Make another request
        </button>
      </div>
    );
  return (
    <form className="premium-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Full name
          <input required placeholder="Your full name" />
        </label>
        <label>
          Phone number
          <input required type="tel" placeholder="012 345 678" />
        </label>
      </div>
      <label>
        Email
        <input required type="email" placeholder="you@example.com" />
      </label>
      <div className="form-row">
        <label>
          Number of guests
          <select required defaultValue="2">
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6+</option>
          </select>
        </label>
        <label>
          Date
          <input required type="date" />
        </label>
      </div>
      <label>
        Reservation time
        <select required defaultValue="7:00 PM">
          <option>11:30 AM</option>
          <option>1:00 PM</option>
          <option>5:30 PM</option>
          <option>7:00 PM</option>
          <option>8:30 PM</option>
        </select>
      </label>
      <label>
        Special request
        <textarea rows={4} placeholder="Birthday, allergies, seating preference…" />
      </label>
      <button className="red-button">Request a table</button>
      <small>Interactive demo — no real reservation will be created.</small>
    </form>
  );
}
export function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <div className="form-success">
        <FiCheck />
        <h2>Message received.</h2>
        <p>Demo inquiry saved for this screen only.</p>
        <button className="outline-button" onClick={() => setSent(false)}>
          Send another
        </button>
      </div>
    );
  return (
    <form
      className="premium-form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label>
        Full name
        <input required placeholder="Your full name" />
      </label>
      <div className="form-row">
        <label>
          Phone
          <input required type="tel" />
        </label>
        <label>
          Email
          <input required type="email" />
        </label>
      </div>
      <label>
        How can we help?
        <textarea required rows={5} placeholder="Your inquiry" />
      </label>
      <button className="red-button">Send demo inquiry</button>
    </form>
  );
}
export function ContactDetails() {
  return (
    <div className="contact-cards">
      <article>
        <FiMapPin />
        <div>
          <b>Visit</b>
          <span>
            #20 Street 302, BKK1
            <br />
            Phnom Penh, Cambodia
          </span>
        </div>
      </article>
      <article>
        <FiPhone />
        <div>
          <b>Call</b>
          <a href="tel:+85561798383">061 798 383</a>
        </div>
      </article>
      <article>
        <FiMail />
        <div>
          <b>Email</b>
          <a href="mailto:hello@theboilingseafood.demo">hello@theboilingseafood.demo</a>
        </div>
      </article>
    </div>
  );
}
