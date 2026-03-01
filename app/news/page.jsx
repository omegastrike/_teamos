export const dynamic = "force-dynamic";

import { supabase } from "../../lib/supabase";
import Link from "next/link";

export default async function NewsPage() {
  const { data: articles } = await supabase
    .from("news")
    .select("*")
    .order("published_at", { ascending: false });

  if (!articles || articles.length === 0) {
    return (
      <main className="min-h-screen pt-32 px-6 text-white">
        <div className="text-center text-gray-400">
          No articles published yet.
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen pt-32 px-4 md:px-6 text-white">

      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.06),transparent_60%)]" />

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-20">
          <h1 className="text-4xl md:text-5xl font-sequel mb-4">
            Newsroom
          </h1>
          <p className="text-gray-400 max-w-xl">
            Official announcements, tournament updates and roster developments.
          </p>
        </div>

        {/* ARTICLES LIST */}
        <div className="space-y-12">

          {articles.map((article, index) => (
            <div key={article.id}>

              <Link
                href={`/news/${article.slug}`}
                className="group block"
              >
                <div className="grid md:grid-cols-[320px_1fr] gap-8 items-center">

                  {/* IMAGE */}
                  {article.cover_image && (
                    <div className="h-48 md:h-52 overflow-hidden rounded-lg">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  )}

                  {/* CONTENT */}
                  <div>

                    <h2 className="text-2xl font-semibold group-hover:text-gold transition">
                      {article.title}
                    </h2>

                    {article.summary && (
                      <p className="text-gray-400 mt-3 line-clamp-2">
                        {article.summary}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-500">
                      {article.author && <span>By {article.author}</span>}
                      {article.published_at && (
                        <span>
                          {new Date(article.published_at).toLocaleDateString()}
                        </span>
                      )}
                      {article.reading_time && (
                        <span>{article.reading_time}</span>
                      )}
                    </div>

                  </div>
                </div>
              </Link>

              {/* Divider Line */}
              {index !== articles.length - 1 && (
                <div className="mt-12 h-px bg-gold/10" />
              )}

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}
