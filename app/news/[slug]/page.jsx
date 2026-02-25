export const dynamic = "force-dynamic";

// import { notFound } from "next/navigation";
// import { supabase } from "../../../lib/supabase";

// export default async function NewsArticle({ params }) {
//   const { slug } = params;

//   const { data: article } = await supabase
//     .from("news")
//     .select("*")
//     .eq("slug", slug)
//     .single();

//   if (!article) notFound();

//   return (
//     <main className="min-h-screen bg-black text-white px-6 py-24">
//       <div className="max-w-3xl mx-auto">

//         <h1 className="text-4xl font-bold mb-6">
//           {article.title}
//         </h1>

//         {article.cover_image && (
//           <img
//             src={article.cover_image}
//             alt={article.title}
//             className="rounded-xl mb-8"
//           />
//         )}

//         <div className="text-gray-300 leading-relaxed whitespace-pre-line">
//           {article.content}
//         </div>

//       </div>
//     </main>
//   );
// }

import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewsDetail({ params }) {
  const { slug } = params;

  const { data: article } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!article) notFound();

  return (
    <main className="min-h-screen pt-32 px-6 bg-black text-white">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          {article.title}
        </h1>

        <p className="text-gray-400 mb-8">
          {article.summary}
        </p>

        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
          {article.content}
        </div>

      </div>
    </main>
  );
}
