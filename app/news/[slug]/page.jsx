export const dynamic = "force-dynamic";

import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";

export default async function NewsArticle({ params }) {
  const { slug } = params;

  const { data: article } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!article) notFound();

  return (
    <main className="relative min-h-screen px-4 md:px-6 py-24 text-white">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.08),transparent_60%)]" />

      <div className="max-w-4xl mx-auto">

        {/* Cover Image */}
        {article.cover_image && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-gold/20">
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
          <span>{new Date(article.published_at).toLocaleDateString()}</span>
          {article.author && <span>By {article.author}</span>}
          {article.reading_time && <span>{article.reading_time}</span>}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-sequel mb-8">
          {article.title}
        </h1>

        {/* Content */}
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

      </div>
    </main>
  );
}
