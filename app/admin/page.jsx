"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import PlayersEditor from "./sections/PlayersEditor";
import NewsEditor from "./sections/NewsEditor";
import AchievementsEditor from "./sections/AchievementsEditor";

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("players");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function login(e) {
    e.preventDefault();
    await supabase.auth.signInWithPassword({ email, password });
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  if (loading) return null;

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <form onSubmit={login} className="space-y-4 w-80">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-black border border-gold/30 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-black border border-gold/30 rounded"
          />
          <button className="w-full h-12 bg-gold text-black rounded">
            Login
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={logout} className="text-red-400">
          Logout
        </button>
      </div>

      <div className="flex gap-4 mb-10">
        <Tab label="Players" active={tab==="players"} onClick={()=>setTab("players")} />
        <Tab label="News" active={tab==="news"} onClick={()=>setTab("news")} />
        <Tab label="Achievements" active={tab==="achievements"} onClick={()=>setTab("achievements")} />
        <a href="https://formspree.io/forms" target="_blank" className="px-4 py-2 border border-gold/30 rounded">
          Forms
        </a>
      </div>

      {tab==="players" && <PlayersEditor />}
      {tab==="news" && <NewsEditor />}
      {tab==="achievements" && <AchievementsEditor />}
    </main>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded ${
        active ? "bg-gold text-black" : "border border-gold/30"
      }`}
    >
      {label}
    </button>
  );
}
