"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPlayersPage() {
  const [players, setPlayers] = useState([]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  /* Load players from Supabase */
  useEffect(() => {
    async function fetchPlayers() {
      const { data } = await supabase
        .from("players")
        .select("*")
        .order("id");

      setPlayers(data || []);
    }

    fetchPlayers();
  }, []);

  /* Update field locally */
  function updateField(index, field, value) {
    const updated = [...players];
    updated[index] = { ...updated[index], [field]: value };
    setPlayers(updated);
  }

  /* Save all players to Supabase */
  async function saveChanges() {
    setSaving(true);
    setSuccess(false);

    for (const player of players) {
      const { data, error } = await supabase
  .from("players")
  .update({
    name: player.name,
    role: player.role,
    kd: Number(player.kd),
    matches: Number(player.matches),
    bio: player.bio, 
  })
  .eq("id", player.id)
  .select();

console.log("Update result:", data, error);

    }

    setSaving(false);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 2500);
  }

  return (
    <main className="min-h-screen pt-24 px-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-8">
        Manage Players
      </h1>

      <div className="space-y-6 max-w-3xl">
        {players.map((p, i) => (
          <div
            key={p.id}
            className="backdrop-blur-xl bg-glass border border-gold/30 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold mb-4">
              {p.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Name"
                value={p.name}
                onChange={(v) => updateField(i, "name", v)}
              />

              <Input
                label="Role"
                value={p.role}
                onChange={(v) => updateField(i, "role", v)}
              />

              <Input
                label="K/D Ratio"
                type="number"
                value={p.kd}
                onChange={(v) => updateField(i, "kd", v)}
              />

              <Input
                label="Matches Played"
                type="number"
                value={p.matches}
                onChange={(v) => updateField(i, "matches", v)}
              />

              <Input
                label="Bio"
                value={p.bio}
                onChange={(v) => updateField(i, "bio", v)}
                textarea
              />

            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={saveChanges}
          disabled={saving}
          className="px-8 h-12 rounded-full bg-gold text-black font-semibold disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

        {success && (
          <span className="text-green-400 animate-fade-in">
            ✅ Changes saved successfully
          </span>
        )}
      </div>
    </main>
  );
}

// function Input({ label, value, onChange, type = "text" }) {
//   return (
//     <div>
//       <label className="block text-sm text-gray-400 mb-1">
//         {label}
//       </label>
//       <input
//         type={type}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gold/30 outline-none focus:border-gold"
//       />
//     </div>
//   );
// }
function Input({ label, value, onChange, type = "text", textarea }) {
  return (
    <div className="col-span-full">
      <label className="block text-sm text-gray-400 mb-1">
        {label}
      </label>

      {textarea ? (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gold/30 outline-none focus:border-gold resize-none"
        />
      ) : (
        <input
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gold/30 outline-none focus:border-gold"
        />
      )}
    </div>
  );
}

