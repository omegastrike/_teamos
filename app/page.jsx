// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";

// import Loader from "@/components/Loader";
// import Reveal from "@/components/Reveal";
// import Navbar from "@/components/Navbar";
// import { translations } from "@/lib/translations";
// import { supabase } from "@/lib/supabase";

// import {
//   Instagram,
//   Youtube,
//   MessageCircle,
//   Crosshair,
//   Zap,
//   Shield,
//   Eye,
//   Mail, 
//   ShieldCheck,
// } from "lucide-react";

// /* ROLE → ICON MAP */
// const roleIcons = {
//   IGL: Crosshair,
//   Assaulter: Zap,
//   Support: Shield,
//   Scout: Eye,
// };

// const founders = [
//   {
//     name: "Ramesh",
//     role: "Founder",
//     desc: "Visionary behind Omegastrike, driving competitive excellence and long-term growth.",
//   },
//   {
//     name: "ShankarNath",
//     role: "Co-Founder",
//     desc: "Strategic leader focused on team building and in-game dominance.",
//   },
// ];


// export default function Home() {
  
//   const [news, setNews] = useState([]);
  
//   const [loading, setLoading] = useState(true);
//   const [language, setLanguage] = useState("en");

//   const [players, setPlayers] = useState([]);
//   const [playersLoading, setPlayersLoading] = useState(true);

//   const t = translations[language];

//   /* Page loader delay */
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1800);
//     return () => clearTimeout(timer);
//   }, []);

//   /* Supabase fetch + realtime */
//   useEffect(() => {
//     let channel;

//     async function fetchPlayers(isRealtime = false) {
//       if (!isRealtime) setPlayersLoading(true);

//       const { data, error } = await supabase
//         .from("players")
//         .select("*")
//         .order("slug");

//       if (error) {
//         console.error("Supabase error:", error);
//       } else {
//         setPlayers(data || []);
//       }

//       if (!isRealtime) setPlayersLoading(false);
//     }

//     // Initial load
//     fetchPlayers(false);

//     // Realtime updates
//     channel = supabase
//       .channel("players-live")
//       .on(
//         "postgres_changes",
//         { event: "*", schema: "public", table: "players" },
//         () => fetchPlayers(true)
//       )
//       .subscribe();

//     return () => {
//       if (channel) supabase.removeChannel(channel);
//     };
//   }, []);

//   useEffect(() => {
//   async function fetchLatestNews() {
//     const { data } = await supabase
//       .from("news")
//       .select("*")
//       .order("created_at", { ascending: false })
//       .limit(3);

//     setNews(data || []);
//   }

//   fetchLatestNews();
// }, []);

//   return (
//     <>
//       <Loader isLoading={loading} />
//       <Navbar language={language} setLanguage={setLanguage} />

//       {!loading && (
//         <main className="pt-24 overflow-x-hidden">

//           {/* HERO */}
//           <Reveal>
//             <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
//               <div className="mb-6">
//                 <Image
//                   src="/logo.png"
//                   alt="Omegastrike Logo"
//                   width={160}
//                   height={160}
//                   priority
//                   className="drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]"
//                 />
//               </div>

//               <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
//                 OMEGASTRIKE
//               </h1>

//               <p className="mt-2 text-gray-400 text-sm">
//                 {t.heroSubtitle}
//               </p>

//               <p className="mt-4 max-w-xl text-gray-300 text-sm md:text-base">
//                 {t.heroDesc}
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 mt-8">
//                 <Link
//                   href="/apply"
//                   className="flex items-center justify-center h-12 px-8 rounded-full bg-gold text-black font-semibold hover:scale-105 transition"
//                 >
//                   Join the Strike
//                 </Link>

//                 <Link
//                   href="/contact"
//                   className="flex items-center justify-center h-12 px-8 rounded-full border border-gold/50 hover:bg-gold/10 transition"
//                 >
//                   Watch Highlights
//                 </Link>
//               </div>
//             </section>
//           </Reveal>

//           {/* ABOUT */}
//           <Reveal>
//             <section className="py-24 px-6 flex justify-center">
//               <div className="max-w-3xl backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl p-8 text-center">
//                 <h2 className="text-3xl font-semibold mb-4">
//                   {t.aboutTitle}
//                 </h2>
//                 <p className="text-gray-300">
//                   {t.aboutDesc}
//                 </p>
//               </div>
//             </section>
//           </Reveal>

//           {/* BGMI ROSTER */}
//           <Reveal>
//             <section className="py-24 px-6">
//               <h2 className="text-center text-3xl font-semibold mb-12">
//                 {t.rosterTitle}
//               </h2>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

//                 {playersLoading && (
//                   <p className="col-span-full text-center text-gray-400">
//                     Loading roster...
//                   </p>
//                 )}

//                 {!playersLoading && players.length === 0 && (
//                   <p className="col-span-full text-center text-gray-400">
//                     No players found.
//                   </p>
//                 )}

//                 {!playersLoading &&
//                   players.map((p, i) => {
//                     const Icon = roleIcons[p.role];

//                     return (
//                       <Reveal delay={i * 0.1} key={p.slug}>
//                         <div className="backdrop-blur-xl bg-glass border border-gold/30 rounded-xl p-6 text-center hover:scale-105 transition">

//                           {Icon && (
//                             <div className="flex justify-center mb-3">
//                               <Icon size={22} className="text-gold" />
//                             </div>
//                           )}

//                           <Link
//                             href={`/players/${p.slug}`}
//                             className="text-xl font-semibold hover:text-gold transition"
//                           >
//                             {p.name}
//                           </Link>

//                           <p className="text-gold text-sm mt-2">
//                             {p.role}
//                           </p>
//                         </div>
//                       </Reveal>
//                     );
//                   })}
//               </div>
//             </section>
//           </Reveal>

//           {/* FOUNDERS */}
// <Reveal>
//   <section className="py-24 px-6">
//     <h2 className="text-center text-3xl font-semibold mb-12">
//       Leadership
//     </h2>

//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">

//       {founders.map((f, i) => (
//         <Reveal delay={i * 0.1} key={f.name}>
//           <div className="backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl p-8 text-center hover:scale-105 transition">

//             {/* AVATAR */}
//             <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gold/10 border border-gold/30 text-gold text-xl font-bold">
//               {f.name.charAt(0)}
//             </div>

//             {/* NAME */}
//             <h3 className="text-xl font-semibold mb-1">
//               {f.name}
//             </h3>

//             {/* ROLE */}
//             <p className="text-gold text-sm mb-4">
//               {f.role}
//             </p>

//             {/* DESCRIPTION */}
//             <p className="text-gray-400 text-sm leading-relaxed">
//               {f.desc}
//             </p>

//           </div>
//         </Reveal>
//       ))}

//     </div>
//   </section>
// </Reveal>

//           {/* SPONSORS MARQUEE */}
// <section className="py-20 relative">

//   <h2 className="text-center text-3xl font-sequel mb-10">
//     Our Sponsors
//   </h2>

//   <div className="relative w-full overflow-x-hidden overflow-y-visible py-6">

//     {/* TOP/BOTTOM DEPTH OVERLAY */}
//     <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent pointer-events-none z-10" />

//     {/* LEFT FADE */}
//     {/* <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-20" /> */}

//     {/* RIGHT FADE */}
//     {/* <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-20" /> */}

//     {/* MARQUEE CONTAINER */}
//     <div className="flex gap-16 animate-marquee whitespace-nowrap relative z-0">

//       {[
//         "Your Brand Here",
//         "Official Partner",
//         "Title Sponsor",
//         "Now Partnering",
//         "Strategic Partner",
//         "Become a Sponsor",
//       ]
//         .concat([
//           "Your Brand Here",
//           "Official Partner",
//           "Title Sponsor",
//           "Now Partnering",
//           "Strategic Partner",
//           "Become a Sponsor",
//         ])
//         .map((name, i) => (
//           <div key={i} className="w-[240px] flex-shrink-0 flex justify-center">

//             {/* FLOAT WRAPPER (separate transform layer) */}
//             <div
//               style={{ animationDelay: `${i * 0.3}s` }}
//               className="float-soft w-full h-[110px] flex items-center justify-center text-center
//            px-6
//            backdrop-blur-md bg-white/[0.04]
//            border border-gold/20 rounded-2xl
//            opacity-70 hover:opacity-100
//            hover:border-gold
//            hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]
//            hover:scale-[1.05]
//            transition-all duration-300"
//             >
//               <span className="text-gray-400 tracking-wider text-sm uppercase">
//                 {name}
//               </span>
//             </div>

//           </div>
//         ))}

//     </div>
//   </div>
// </section>

//           {/* SOCIALS */}
//           <Reveal>
//   <section className="py-24 px-6 text-center">
//     <h2 className="text-3xl font-semibold mb-6">
//       {t.connectTitle}
//     </h2>

//     {/* SOCIAL LINKS */}
//     <div className="flex justify-center gap-6 mb-12 flex-wrap">

//       {/* INSTAGRAM */}
//       <a
//         href="https://instagram.com/omegastrike.esports/"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center gap-3 backdrop-blur-xl bg-glass border border-gold/30 
//                    rounded-full px-6 py-3 
//                    hover:scale-105 hover:border-gold 
//                    hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]
//                    transition-all duration-300"
//       >
//         <Instagram size={18} />
//         Instagram
//       </a>

//       {/* YOUTUBE */}
//       <a
//         href="https://youtube.com/@octane29"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center gap-3 backdrop-blur-xl bg-glass border border-gold/30 
//                    rounded-full px-6 py-3 
//                    hover:scale-105 hover:border-gold 
//                    hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]
//                    transition-all duration-300"
//       >
//         <Youtube size={18} />
//         YouTube
//       </a>

//       {/* DISCORD */}
//       <a
//         href="https://discord.gg/myEtkWjawk"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="flex items-center gap-3 backdrop-blur-xl bg-glass border border-gold/30 
//                    rounded-full px-6 py-3 
//                    hover:scale-105 hover:border-gold 
//                    hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]
//                    transition-all duration-300"
//       >
//         <MessageCircle size={18} />
//         Discord
//       </a>

//     </div>

//     {/* CTA BUTTONS */}
//     <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

//       <Link
//         href="/apply"
//         className="flex items-center justify-center h-12 px-8 rounded-full border border-gold/50 hover:bg-gold/10 transition"
//       >
//         Apply to Clan
//       </Link>

//       <Link
//         href="/partner"
//         className="flex items-center justify-center h-12 px-10 rounded-full bg-gold text-black font-semibold hover:scale-105 transition"
//       >
//         {t.partnerBtn}
//       </Link>

//       <Link
//         href="/contact"
//         className="flex items-center justify-center h-12 px-8 rounded-full border border-gold/50 hover:bg-gold/10 transition"
//       >
//         Contact Us
//       </Link>

//     </div>
//   </section>
// </Reveal>

//           {/* LATEST NEWS PREVIEW */}
// <section className="py-24 px-6">
//   <h2 className="text-center text-3xl font-semibold mb-12">
//     Latest News
//   </h2>

//   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

//     {news.map((article) => (
//       <Link
//         key={article.id}
//         href={`/news/${article.slug}`}
//         className="backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl overflow-hidden hover:scale-105 transition"
//       >
//         {article.cover_image && (
//           <div
//             className="h-40 bg-cover bg-center"
//             style={{ backgroundImage: `url(${article.cover_image})` }}
//           />
//         )}

//         <div className="p-6">
//           <h3 className="text-lg font-semibold mb-2">
//             {article.title}
//           </h3>

//           <p className="text-gray-400 text-sm">
//             {article.excerpt}
//           </p>
//         </div>
//       </Link>
//     ))}

//   </div>

//   <div className="text-center mt-10">
//     <Link
//       href="/news"
//       className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-gold/50 hover:bg-gold/10 transition"
//     >
//       View All News
//     </Link>
//   </div>
// </section>

//           {/* FOOTER */}
//           <footer className="py-10 text-center text-sm text-gray-500 space-y-4">

//   {/* CONTACT EMAILS */}
//   <div className="flex flex-col sm:flex-row justify-center items-center gap-6">

//     {/* SUPPORT */}
//     <a
//       href="mailto:support@omegastrike.in"
//       className="flex items-center gap-2 hover:text-gold transition"
//     >
//       <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 border border-gold/30">
//         <Mail size={16} className="text-gold" />
//       </span>
//       <span>
//         Support <span className="text-gray-300"></span>
//       </span>
//     </a>

//     {/* ADMIN */}
//     <a
//       href="mailto:admin@omegastrike.in"
//       className="flex items-center gap-2 hover:text-gold transition"
//     >
//       <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 border border-gold/30">
//         <ShieldCheck size={16} className="text-gold" />
//       </span>
//       <span>
//         Admin <span className="text-gray-300"></span>
//       </span>
//     </a>

//   </div>

//   {/* DIVIDER */}
//   <div className="w-24 h-px bg-gold/30 mx-auto" />

//   {/* COPYRIGHT */}
//   <div className="space-y-1">
//     <div>© 2026 Omegastrike Esports · BGMI · India 🇮🇳</div>
//     <div className="text-gray-600">
//       Designed & Developed by Octane
//     </div>
//   </div>

// </footer>
//         </main>
//       )}
//     </>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Loader from "../components/Loader";
import Reveal from "../components/Reveal";
import Navbar from "../components/Navbar";
import { translations } from "../lib/translations";
import { supabase } from "../lib/supabase";

import {
  Instagram,
  Youtube,
  MessageCircle,
  Crosshair,
  Zap,
  Shield,
  Eye,
  Mail, 
  ShieldCheck,
} from "lucide-react";

/* ROLE → ICON MAP */
const roleIcons = {
  IGL: Crosshair,
  Assaulter: Zap,
  Support: Shield,
  Scout: Eye,
};

const sponsors = [
  {
    name: "Coming Soon",
    logo: null,
  },
  {
    name: "Your Brand Here",
    logo: null,
  },
];

const founders = [
  {
    name: "Ramesh",
    role: "Founder",
    desc: "Visionary behind Omegastrike, driving competitive excellence and long-term growth.",
  },
  {
    name: "ShankarNath",
    role: "Co-Founder",
    desc: "Strategic leader focused on team building and in-game dominance.",
  },
];




export default function Home() {

  const [news, setNews] = useState([]);

  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  const [players, setPlayers] = useState([]);
  const [playersLoading, setPlayersLoading] = useState(true);

  const t = translations[language];

  /* Page loader delay */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  /* Supabase fetch + realtime */
  useEffect(() => {
    let channel;

    async function fetchPlayers(isRealtime = false) {
      if (!isRealtime) setPlayersLoading(true);

      const { data, error } = await supabase
        .from("players")
        .select("*")
        .order("slug");

      if (error) {
        console.error("Supabase error:", error);
      } else {
        setPlayers(data || []);
      }

      if (!isRealtime) setPlayersLoading(false);
    }

    // Initial load
    fetchPlayers(false);

    // Realtime updates
    channel = supabase
      .channel("players-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "players" },
        () => fetchPlayers(true)
      )
      .subscribe();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
  async function fetchLatestNews() {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    setNews(data || []);
  }

  fetchLatestNews();
}, []);

  return (
    <>
      <Loader isLoading={loading} />
      <Navbar language={language} setLanguage={setLanguage} />

      {!loading && (
        <main className="pt-24 overflow-x-hidden">

          {/* HERO — Corporate Tech Style */}
<section className="relative min-h-screen flex items-center px-6">

  {/* Background gradient layer */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(212,175,55,0.08),transparent_60%)]" />

  <div className="relative max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <div className="space-y-8">

      <h1 className="text-5xl md:text-7xl font-sequel leading-tight">
        OMEGASTRIKE
      </h1>

      <p className="text-lg text-gray-400 max-w-xl">
        Professional BGMI Esports Organization built on structure,
        discipline, and competitive excellence.
      </p>

      <div className="flex gap-4 pt-4">
        <Link
          href="/apply"
          className="px-8 h-12 flex items-center justify-center rounded-md bg-gold text-black font-semibold hover:opacity-90 transition"
        >
          Join the Team
        </Link>

        <Link
          href="/news"
          className="px-8 h-12 flex items-center justify-center rounded-md border border-gold/40 text-white hover:bg-gold/10 transition"
        >
          Latest News
        </Link>
      </div>

    </div>

    {/* RIGHT VISUAL */}
    <div className="hidden md:flex justify-center">
      <div className="relative w-[420px] h-[420px] rounded-full bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="Omegastrike Logo"
          width={260}
          height={260}
          className="opacity-90"
        />
      </div>
    </div>

  </div>
</section>

{/* ORGANIZATION IDENTITY */}
<section className="py-32 px-6 border-t border-gold/10">
  <div className="max-w-7xl mx-auto">

    {/* Section Header */}
    <div className="mb-16 text-center">
      <h2 className="text-4xl font-sequel mb-4">
        Organization
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Built with long-term vision, structured leadership,
        and commitment to competitive integrity.
      </p>
    </div>

    {/* 3 Column Grid */}
    <div className="grid md:grid-cols-3 gap-8">

      {/* Mission */}
      <div className="bg-neutral-900 border border-gold/10 p-10 rounded-lg hover:border-gold/30 transition">
        <h3 className="text-xl font-semibold mb-4">
          Mission
        </h3>
        <p className="text-gray-400 leading-relaxed">
          To compete at the highest level of BGMI esports
          while building a sustainable and respected
          competitive organization.
        </p>
      </div>

      {/* Vision */}
      <div className="bg-neutral-900 border border-gold/10 p-10 rounded-lg hover:border-gold/30 transition">
        <h3 className="text-xl font-semibold mb-4">
          Vision
        </h3>
        <p className="text-gray-400 leading-relaxed">
          To establish Omegastrike as a premier esports
          institution representing excellence in India
          and internationally.
        </p>
      </div>

      {/* Values */}
      <div className="bg-neutral-900 border border-gold/10 p-10 rounded-lg hover:border-gold/30 transition">
        <h3 className="text-xl font-semibold mb-4">
          Values
        </h3>
        <p className="text-gray-400 leading-relaxed">
          Discipline. Integrity. Competitive Excellence.
          Team-first mindset with professional conduct
          across all operations.
        </p>
      </div>

    </div>

  </div>
</section>

{/* FEATURED NEWS */}
<section className="py-32 px-6 border-t border-gold/10">
  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <div className="flex justify-between items-end mb-16">
      <div>
        <h2 className="text-4xl font-sequel mb-4">
          Latest News
        </h2>
        <p className="text-gray-400 max-w-xl">
          Official announcements, tournament updates,
          and organizational developments.
        </p>
      </div>

      <Link
        href="/news"
        className="hidden md:inline-block text-sm border-b border-gold/40 hover:border-gold transition"
      >
        View All →
      </Link>
    </div>

    {/* News Grid */}
    <div className="grid md:grid-cols-3 gap-10">

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-neutral-900 border border-gold/10 rounded-lg overflow-hidden hover:border-gold/30 transition"
        >
          {/* Image Placeholder */}
          <div className="h-48 bg-neutral-800" />

          {/* Content */}
          <div className="p-8 space-y-4">
            <p className="text-xs text-gold uppercase tracking-wider">
              Tournament Update
            </p>

            <h3 className="text-lg font-semibold">
              Omegastrike Qualifies for BGMI Invitational
            </h3>

            <p className="text-gray-400 text-sm leading-relaxed">
              The team secured qualification through consistent
              performance across regional circuits.
            </p>

            <Link
              href="/news"
              className="text-sm text-gray-300 hover:text-white transition"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}

    </div>

  </div>
</section>

{/* TEAM ROSTER */}
<section className="py-32 px-6 border-t border-gold/10">
  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <div className="mb-16">
      <h2 className="text-4xl font-sequel mb-4">
        Strike Unit
      </h2>
      <p className="text-gray-400 max-w-xl">
        Professional roster competing in national and
        international BGMI tournaments.
      </p>
    </div>

    {/* Grid */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {playersLoading && (
        <p className="col-span-full text-center text-gray-400">
          Loading roster...
        </p>
      )}

      {!playersLoading && players.length === 0 && (
        <p className="col-span-full text-center text-gray-400">
          No players found.
        </p>
      )}

      {!playersLoading &&
        players.map((player) => (
          <Link
            key={player.slug}
            href={`/players/${player.slug}`}
            className="bg-neutral-900 border border-gold/10 p-8 rounded-lg hover:border-gold/30 transition group"
          >

            {/* Avatar Placeholder */}
            <div className="h-28 mb-6 bg-neutral-800 rounded-md" />

            {/* Name */}
            <h3 className="text-lg font-semibold group-hover:text-gold transition">
              {player.name}
            </h3>

            {/* Role */}
            <p className="text-sm text-gray-400 mt-2">
              {player.role}
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-gold/10 my-6" />

            {/* Stats */}
            <div className="grid grid-cols-3 text-center text-sm">

              <div>
                <p className="text-gray-500">K/D</p>
                <p className="font-semibold text-gold">
                  {player.kd}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Matches</p>
                <p className="font-semibold text-gold">
                  {player.matches}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Wins</p>
                <p className="font-semibold text-gold">
                  {player.wins}
                </p>
              </div>

            </div>

          </Link>
        ))}

    </div>

  </div>
</section>

          {/* TEAM STATS */}
<section className="py-24 px-6 relative">
  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent pointer-events-none" />

  <h2 className="text-center text-3xl font-sequel mb-12">
    Performance
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">

    <Stat number={40} suffix="+" label="Matches Played" />
    <Stat number={12} suffix="" label="Wins" />
    <Stat number={6} suffix="" label="Avg Team K/D" />
    <Stat number={0} suffix="L+" label="Prize Earnings (₹)" />

  </div>
</section>

{/* SPONSORS */}
<section className="py-32 px-6 border-t border-gold/10">
  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <div className="mb-16 text-center">
      <h2 className="text-4xl font-sequel mb-4">
        Partners
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Strategic alliances supporting Omegastrike’s competitive
        operations and long-term development.
      </p>
    </div>

    {/* TITLE SPONSOR */}
    <div className="mb-20">
      <h3 className="text-sm uppercase tracking-wider text-gold mb-8 text-center">
        Title Partner
      </h3>

      <div className="flex justify-center">
        <div className="w-64 h-24 bg-neutral-900 border border-gold/10 rounded-lg flex items-center justify-center hover:border-gold/30 transition">
          <span className="text-gray-500 text-sm">
            Your Brand Here
          </span>
        </div>
      </div>
    </div>

    {/* OFFICIAL PARTNERS */}
    <div>
      <h3 className="text-sm uppercase tracking-wider text-gold mb-10 text-center">
        Official Partners
      </h3>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {[1,2,3,4].map((item) => (
          <div
            key={item}
            className="h-20 bg-neutral-900 border border-gold/10 rounded-lg flex items-center justify-center hover:border-gold/30 transition"
          >
            <span className="text-gray-500 text-xs">
              Partner Logo
            </span>
          </div>
        ))}
      </div>
    </div>

  </div>
</section>

{/* FOOTER */}
<footer className="border-t border-gold/10 bg-black py-20 px-6">
  <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-sm">

    {/* COLUMN 1 */}
    <div>
      <h4 className="font-semibold mb-6 text-white">
        Omegastrike
      </h4>
      <p className="text-gray-400 leading-relaxed">
        Professional BGMI esports organization competing
        at national and international levels.
      </p>
    </div>

    {/* COLUMN 2 */}
    <div>
      <h4 className="font-semibold mb-6 text-white">
        Organization
      </h4>
      <ul className="space-y-3 text-gray-400">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/news">News</Link></li>
        <li><Link href="/media">Media Kit</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </div>

    {/* COLUMN 3 */}
    <div>
      <h4 className="font-semibold mb-6 text-white">
        Competitive
      </h4>
      <ul className="space-y-3 text-gray-400">
        <li><Link href="/apply">Join Team</Link></li>
        <li><Link href="/players/head">Roster</Link></li>
        <li><Link href="/highlights">Highlights</Link></li>
      </ul>
    </div>

    {/* COLUMN 4 */}
    <div>
      <h4 className="font-semibold mb-6 text-white">
        Contact
      </h4>
      <ul className="space-y-3 text-gray-400">
        <li>support@omegastrike.in</li>
        <li>admin@omegastrike.in</li>
        <li className="flex gap-4 pt-2">
          <a href="#" className="hover:text-white transition">Instagram</a>
          <a href="#" className="hover:text-white transition">Discord</a>
        </li>
      </ul>
    </div>

  </div>

  {/* Bottom Line */}
  <div className="mt-16 pt-8 border-t border-gold/10 text-center text-gray-500 text-xs">
    © 2026 Omegastrike Esports. All rights reserved.
  </div>
</footer>
        </main>
      )}
    </>
  );
}

function Stat({ number, suffix, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = number / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= number) {
        start = number;
        clearInterval(counter);
      }
      setCount(parseFloat(start.toFixed(1)));
    }, 16);

    return () => clearInterval(counter);
  }, [number]);

  return (
    <div className="backdrop-blur-xl bg-glass border border-gold/20 rounded-2xl p-8 hover:scale-105 transition">

      <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
        {count}{suffix}
      </div>

      <div className="text-gray-400 text-sm tracking-wide">
        {label}
      </div>

    </div>
  );
}
