"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthorized(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  }

  if (!authorized) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm backdrop-blur-xl bg-glass border border-gold/30 rounded-xl p-8"
        >
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gold/30 outline-none mb-3"
          />

          {error && (
            <p className="text-red-400 text-sm mb-3 text-center">
              {error}
            </p>
          )}

          <button className="w-full h-12 rounded-full bg-gold text-black font-semibold">
            Login
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 px-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">
        Omegastrike Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <AdminCard
          title="Manage Players"
          desc="Edit player names, roles & stats"
          link="/admin/players"
        />

        <AdminCard
          title="Achievements"
          desc="Update tournaments & results"
          link="/admin/achievements"
        />

        <AdminCard
          title="Forms"
          desc="View applications & messages"
          link="https://formspree.io/forms"
          external
        />

      </div>
    </main>
  );
}

function AdminCard({ title, desc, link, external }) {
  return (
    <a
      href={link}
      target={external ? "_blank" : "_self"}
      className="backdrop-blur-xl bg-glass border border-gold/30 rounded-xl p-6 hover:scale-105 transition"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-400 text-sm">{desc}</p>
    </a>
  );
}
