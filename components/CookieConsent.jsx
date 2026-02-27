"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function acceptCookies() {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  }

  function declineCookies() {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto max-w-4xl backdrop-blur-xl bg-black/80 border border-gold/30 rounded-2xl px-6 py-4 shadow-xl animate-fade-in">

      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">

        <p className="text-sm text-gray-300 text-center sm:text-left">
          We use cookies to improve your experience and analyze traffic.
        </p>

        <div className="flex gap-3">

          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm border border-gold/40 rounded-full hover:bg-gold/10 transition"
          >
            Decline
          </button>

          <button
            onClick={acceptCookies}
            className="px-5 py-2 text-sm rounded-full bg-gold text-black font-semibold hover:opacity-90 transition"
          >
            Accept
          </button>

        </div>
      </div>
    </div>
  );
}
