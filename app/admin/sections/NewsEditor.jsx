"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function NewsEditor() {
  const [news, setNews] = useState([]);
  const [uploading, setUploading] = useState(false);

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
          author: "",
          reading_time: "",
        },
      ])
      .select();

    if (data) setNews([data[0], ...news]);
  }

  async function uploadImage(file) {
    if (!file) return null;

    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("news-images")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      setUploading(false);
      return null;
    }

    const { data } = supabase.storage
      .from("news-images")
      .getPublicUrl(fileName);

    setUploading(false);
    return data.publicUrl;
  }

  async function saveArticle(article) {
    await supabase
      .from("news")
      .update({
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        content: article.content,
        author: article.author,
        reading_time: article.reading_time,
        published_at: article.published_at,
        cover_image: article.cover_image,
      })
      .eq("id", article.id);

    alert("Article Saved");
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

  async function handleImageChange(index, file) {
    const imageUrl = await uploadImage(file);
    if (!imageUrl) return;

    updateField(index, "cover_image", imageUrl);
  }

  return (
    <div className="space-y-12">

      <button
        onClick={addArticle}
        className="px-6 h-12 bg-gold text-black rounded-md"
      >
        + Create Article
      </button>

      {news.map((article, i) => (
        <div
          key={article.id}
          className="border border-gold/20 bg-neutral-900 p-6 rounded-xl space-y-4"
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
            label="Author"
            value={article.author}
            onChange={(v) => updateField(i, "author", v)}
          />

          <Input
            label="Reading Time (e.g. 4 min read)"
            value={article.reading_time}
            onChange={(v) => updateField(i, "reading_time", v)}
          />

          <Input
            label="Publish Date"
            type="datetime-local"
            value={
              article.published_at
                ? article.published_at.slice(0, 16)
                : ""
            }
            onChange={(v) => updateField(i, "published_at", v)}
          />

          <Input
            label="Summary"
            value={article.summary}
            onChange={(v) => updateField(i, "summary", v)}
          />

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Cover Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleImageChange(i, e.target.files[0])
              }
              className="text-sm"
            />

            {uploading && (
              <p className="text-xs text-gray-400 mt-2">
                Uploading...
              </p>
            )}

            {article.cover_image && (
              <img
                src={article.cover_image}
                alt="Cover"
                className="mt-4 h-40 rounded-md object-cover border border-gold/20"
              />
            )}
          </div>

          {/* Rich Content Editor */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Content
            </label>

            <ReactQuill
              theme="snow"
              value={article.content || ""}
              onChange={(value) =>
                updateField(i, "content", value)
              }
              className="bg-white text-black rounded"
            />
          </div>

          <div className="flex gap-4 pt-4">
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

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-black border border-gold/20 rounded"
      />
    </div>
  );
}
