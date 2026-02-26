"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function NewsEditor() {
  const [news, setNews] = useState([]);

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

  async function addArticle() {
    const { data } = await supabase
      .from("news")
      .insert([
        {
          title: "New Article",
          slug: "article-" + Date.now(),
          summary: "",
          content: "",
        },
      ])
      .select();

    if (data) setNews([data[0], ...news]);
  }

  async function saveArticle(article) {
    await supabase
      .from("news")
      .update(article)
      .eq("id", article.id);

    alert("Saved");
  }

  async function deleteArticle(id) {
    await supabase.from("news").delete().eq("id", id);
    setNews(news.filter((n) => n.id !== id));
  }

  function updateField(index, field, value) {
    const updated = [...news];
    updated[index][field] = value;
    setNews(updated);
  }

  return (
    <div className="space-y-10">

      <button
        onClick={addArticle}
        className="px-6 h-12 bg-gold text-black rounded-md"
      >
        + Create Article
      </button>

      {news.map((article, i) => (
        <div
          key={article.id}
          className="border border-gold/20 bg-neutral-900 p-6 rounded-xl"
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

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => saveArticle(article)}
              className="px-6 h-10 bg-gold text-black rounded-md"
            >
              Save
            </button>

            <button
              onClick={() => deleteArticle(article.id)}
              className="px-6 h-10 border border-red-500 text-red-400 rounded-md"
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
        rows="6"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-black border border-gold/20 rounded"
      />
    </div>
  );
}
