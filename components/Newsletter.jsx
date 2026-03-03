"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubscribe(e) {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
    } else {
      setStatus("success");
      setEmail("");
    }
  }

  return (
    <section className="py-24 px-6 border-t border-gold/10">
      <div className="max-w-4xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-sequel mb-4">
          Stay Updated
        </h2>

        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          Get roster updates, tournament announcements and exclusive drops.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 max-w-md px-6 h-14 bg-neutral-900 border border-gold/20 rounded-md outline-none focus:border-gold"
          />

          <button
            type="submit"
            className="px-8 h-14 bg-gold text-black font-semibold rounded-md hover:opacity-90 transition"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>

        </form>

        {/* Status Messages */}
        <div className="mt-6 text-sm">

          {status === "success" && (
            <p className="text-green-400">
              Successfully subscribed.
            </p>
          )}

          {status === "duplicate" && (
            <p className="text-yellow-400">
              You're already subscribed.
            </p>
          )}

          {status === "error" && (
            <p className="text-red-400">
              Something went wrong. Try again.
            </p>
          )}

        </div>

      </div>
    </section>
  );
}
