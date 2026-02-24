export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function NewsPage() {
  const { data: articles } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-12 text-center">
          Latest News
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {articles?.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl overflow-hidden hover:scale-105 transition"
            >

              {article.cover_image && (
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${article.cover_image})` }}
                />
              )}

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {article.title}
                </h2>

                <p className="text-gray-400 text-sm">
                  {article.excerpt}
                </p>
              </div>

            </Link>
          ))}

        </div>

      </div>
    </main>
  );
}
