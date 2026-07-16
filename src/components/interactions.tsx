"use client";
import { useState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";

export function ReservationButton({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <>
      <button
        className="red-button"
        onClick={() => {
          setOpen(true);
          setDone(false);
        }}
      >
        {label}
      </button>
      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(false)} aria-label="Close">
              <IoClose />
            </button>
            {done ? (
              <div className="success">
                <span>
                  <IoCheckmark aria-hidden="true" />
                </span>
                <h2>Your table is held.</h2>
                <p>We’ll see you soon for a seafood feast.</p>
                <button className="red-button" onClick={() => setOpen(false)}>
                  Done
                </button>
              </div>
            ) : (
              <>
                <p className="eyebrow">Reservations</p>
                <h2>BOOK A TABLE</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDone(true);
                  }}
                >
                  <label>
                    Name
                    <input required placeholder="Your name" />
                  </label>
                  <div className="form-row">
                    <label>
                      Date
                      <input required type="date" />
                    </label>
                    <label>
                      Guests
                      <select defaultValue="2">
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5+</option>
                      </select>
                    </label>
                  </div>
                  <label>
                    Phone
                    <input required type="tel" placeholder="Phone number" />
                  </label>
                  <button className="red-button" type="submit">
                    Confirm reservation
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
