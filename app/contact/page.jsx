"use client";

import { useState } from "react";
import Link from "next/link";
import Reveal from "../../components/Reveal";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("https://formspree.io/f/mgozvzoq", {
      method: "POST",
      body: new FormData(e.target),
      headers: { Accept: "application/json" },
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      e.target.reset();
    }
  }

  return (
    <main className="min-h-screen pt-32 px-6 flex justify-center">
      <Reveal>
        <div className="w-full max-w-2xl backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl p-8">

          {!success ? (
            <>
              <h1 className="text-3xl font-bold mb-6 text-center">
                Contact Us
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="_gotcha" className="hidden" />

                <Input label="Your Name" name="name" />
                <Input label="Email" name="email" type="email" />

                <textarea
                  name="message"
                  required
                  placeholder="Your message"
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gold/30 outline-none focus:border-gold"
                />

                <button
                  disabled={loading}
                  className="w-full h-12 flex items-center justify-center rounded-full bg-gold text-black font-semibold hover:scale-105 transition disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </>
          ) : (
            /* ✅ SUCCESS ANIMATION */
            <div
              key="success"
              className="flex flex-col items-center text-center animate-fade-in py-10"
            >
              <SuccessContent
                title="Message Sent"
                message="Thanks for reaching out to Omegastrike.
                We’ll get back to you shortly."
              />
            </div>
          )}

        </div>
      </Reveal>
    </main>
  );
}

function SuccessContent({ title, message }) {
  return (
    <>
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full bg-gold/30 blur-xl"></div>

        <svg
          key="check"
          viewBox="0 0 52 52"
          className="relative w-20 h-20"
        >
          <circle
            cx="26"
            cy="26"
            r="25"
            fill="none"
            stroke="rgba(212,175,55,0.3)"
            strokeWidth="2"
          />
          <path
            fill="none"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 27 l7 7 l17 -17"
            className="checkmark"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-semibold mb-2">{title}</h2>

      <p className="text-gray-400 max-w-sm">{message}</p>

      <Link
        href="/"
        className="mt-6 px-8 py-3 rounded-full border border-gold/50 hover:bg-gold/10 transition"
      >
        Back to Home
      </Link>
    </>
  );
}

function Input({ label, name, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        required
        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gold/30 outline-none focus:border-gold"
      />
    </div>
  );
}
