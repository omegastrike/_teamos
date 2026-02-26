"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AchievementsEditor() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await supabase
      .from("achievements")
      .select("*")
      .order("position", { ascending: true });

    setItems(data || []);
  }

  async function addAchievement() {
    const { data } = await supabase
      .from("achievements")
      .insert([
        {
          title: "New Achievement",
          event: "Tournament Name",
          placement: "1st Place",
          year: "2026",
          prize: "",
        },
      ])
      .select();

    if (data) setItems([...items, data[0]]);
  }

  async function save(item) {
    await supabase
      .from("achievements")
      .update(item)
      .eq("id", item.id);
  }

  async function remove(id) {
    await supabase.from("achievements").delete().eq("id", id);
    setItems(items.filter((i) => i.id !== id));
  }

  function updateField(index, field, value) {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  }

  return (
    <div className="space-y-10 max-w-4xl">

      <button
        onClick={addAchievement}
        className="px-6 h-12 bg-gold text-black rounded"
      >
        + Add Achievement
      </button>

      {items.map((item, i) => (
        <div
          key={item.id}
          className="border border-gold/20 p-6 rounded-xl space-y-4"
        >
          <Input
            label="Title"
            value={item.title}
            onChange={(v) => updateField(i, "title", v)}
          />

          <Input
            label="Event"
            value={item.event}
            onChange={(v) => updateField(i, "event", v)}
          />

          <Input
            label="Placement"
            value={item.placement}
            onChange={(v) => updateField(i, "placement", v)}
          />

          <Input
            label="Year"
            value={item.year}
            onChange={(v) => updateField(i, "year", v)}
          />

          <Input
            label="Prize"
            value={item.prize}
            onChange={(v) => updateField(i, "prize", v)}
          />

          <div className="flex gap-4">
            <button
              onClick={() => save(item)}
              className="px-4 py-2 bg-gold text-black rounded"
            >
              Save
            </button>

            <button
              onClick={() => remove(item.id)}
              className="px-4 py-2 border border-red-500 text-red-400 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">
        {label}
      </label>
      <input
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-black border border-gold/20 rounded"
      />
    </div>
  );
}
