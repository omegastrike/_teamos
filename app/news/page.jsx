// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { supabase } from "../../lib/supabase";

// export default function NewsPage() {
//   const [articles, setArticles] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filtered, setFiltered] = useState([]);

//   useEffect(() => {
//     async function fetchNews() {
//       const { data } = await supabase
//         .from("news")
//         .select("*")
//         .order("created_at", { ascending: false });

//       setArticles(data || []);
//       setFiltered(data || []);
//     }

//     fetchNews();
//   }, []);

//   /* SEARCH FILTER */
//   useEffect(() => {
//     const results = articles.filter((article) =>
//       article.title.toLowerCase().includes(search.toLowerCase())
//     );

//     setFiltered(results);
//   }, [search, articles]);

//   return (
//     <main className="min-h-screen bg-black text-white px-6 py-24">
//       <div className="max-w-6xl mx-auto">

//         <h1 className="text-4xl font-bold mb-8 text-center">
//           Latest News
//         </h1>

//         {/* SEARCH BAR */}
//         <div className="max-w-md mx-auto mb-12">
//           <input
//             type="text"
//             placeholder="Search news..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full px-5 py-3 rounded-full bg-black/40 border border-gold/30 outline-none focus:border-gold text-sm"
//           />
//         </div>

//         {/* NEWS GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

//           {filtered.length === 0 && (
//             <p className="col-span-full text-center text-gray-400">
//               No news found.
//             </p>
//           )}

//           {filtered.map((article) => (
//             <Link
//               key={article.id}
//               href={`/news/${article.slug}`}
//               className="backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl overflow-hidden hover:scale-105 transition"
//             >
//               {article.cover_image && (
//                 <div
//                   className="h-48 bg-cover bg-center"
//                   style={{ backgroundImage: `url(${article.cover_image})` }}
//                 />
//               )}

//               <div className="p-6">
//                 <h2 className="text-xl font-semibold mb-2">
//                   {article.title}
//                 </h2>

//                 <p className="text-gray-400 text-sm">
//                   {article.excerpt}
//                 </p>
//               </div>
//             </Link>
//           ))}

//         </div>

//       </div>
//     </main>
//   );
// }

import { supabase } from "../../lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const { data: news } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen pt-32 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

        {news?.map((article) => (
          <Link
            key={article.id}
            href={`/news/${article.slug}`}
            className="border border-gold/20 p-6 rounded-xl bg-neutral-900 hover:border-gold/40 transition"
          >
            <h2 className="text-xl font-semibold mb-3">
              {article.title}
            </h2>

            <p className="text-gray-400 text-sm">
              {article.summary}
            </p>
          </Link>
        ))}

      </div>
    </main>
  );
}
