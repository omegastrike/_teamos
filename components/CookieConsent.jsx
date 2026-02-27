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
    <div className="fixed inset-x-0 bottom-4 z-50 px-4">

      <div className="mx-auto max-w-4xl backdrop-blur-xl bg-black/90 border border-gold/30 rounded-2xl shadow-xl p-5 animate-fade-in">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <p className="text-sm text-gray-300 text-center sm:text-left">
            We use cookies to improve your experience and analyze traffic.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">

            <button
              onClick={declineCookies}
              className="w-full sm:w-auto px-4 py-2 text-sm border border-gold/40 rounded-full hover:bg-gold/10 transition"
            >
              Decline
            </button>

            <button
              onClick={acceptCookies}
              className="w-full sm:w-auto px-5 py-2 text-sm rounded-full bg-gold text-black font-semibold hover:opacity-90 transition"
            >
              Accept
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}
