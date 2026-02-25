"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminNewsPage() {
  const [news, setNews] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    setNews(data || []);
  }

  function updateField(index, field, value) {
    const updated = [...news];
    updated[index][field] = value;
    setNews(updated);
  }

  async function saveChanges() {
    setSaving(true);

    for (const article of news) {
      await supabase
        .from("news")
        .update({
          title: article.title,
          slug: article.slug,
          summary: article.summary,
          content: article.content,
          cover_image: article.cover_image,
        })
        .eq("id", article.id);
    }

    setSaving(false);
    alert("News updated successfully");
  }


  <button
  onClick={addNewArticle}
  className="mb-6 px-6 h-10 bg-gold text-black rounded-md"
>
  + Add New Article
</button> 

  async function addNewArticle() {
  const { data } = await supabase
    .from("news")
    .insert([
      {
        title: "New Article",
        slug: "new-article-" + Date.now(),
        summary: "",
        content: "",
      },
    ])
    .select();

  if (data) {
    setNews([...data, ...news]);
  }
}

  return (
    <main className="min-h-screen pt-24 px-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-8">Manage News</h1>

      <div className="space-y-8 max-w-4xl">
        {news.map((article, i) => (
          <div
            key={article.id}
            className="border border-gold/20 rounded-xl p-6 bg-neutral-900"
          >
            <Input
              label="Title"
              value={article.title}
              onChange={(v) => updateField(i, "title", v)}
            />
            <Input
              label="Slug"
              value={article.slug}
              onChange={(v) => updateField(i, "slug", v)}
            />
            <Input
              label="Summary"
              value={article.summary}
              onChange={(v) => updateField(i, "summary", v)}
            />
            <Textarea
              label="Content"
              value={article.content}
              onChange={(v) => updateField(i, "content", v)}
            />
            <Input
              label="Cover Image URL"
              value={article.cover_image}
              onChange={(v) => updateField(i, "cover_image", v)}
            />
          </div>
        ))}
      </div>

      <button
        onClick={saveChanges}
        disabled={saving}
        className="mt-8 px-8 h-12 bg-gold text-black rounded-full"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </main>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-400 mb-1">
        {label}
      </label>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-black border border-gold/20 rounded"
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-400 mb-1">
        {label}
      </label>
      <textarea
        rows="5"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-black border border-gold/20 rounded"
      />
    </div>
  );
}
