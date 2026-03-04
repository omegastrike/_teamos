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

import Newsletter from "../components/NewsLetter";

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

  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  const [players, setPlayers] = useState([]);
  const [playersLoading, setPlayersLoading] = useState(true);

  const t = translations[language];

  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

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
  let channel;

  async function fetchNews(isRealtime = false) {
    if (!isRealtime) setNewsLoading(true);

    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    if (!error) {
      setNews(data || []);
    }

    if (!isRealtime) setNewsLoading(false);
  }

  fetchNews(false);

  channel = supabase
    .channel("news-live")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "news" },
      () => fetchNews(true)
    )
    .subscribe();

  return () => {
    if (channel) supabase.removeChannel(channel);
  };
}, []);

  return (
    <>
      <Loader isLoading={loading} />
      <Navbar language={language} setLanguage={setLanguage} />

      {!loading && (
        <main className="pt-24 overflow-x-hidden">

{/* HERO — Corporate Tech Style (Responsive Fixed) */}
<section className="relative flex items-center px-4 sm:px-6 pt-28 pb-20 md:pt-36 md:pb-28 min-h-[90vh] overflow-hidden">

  {/* Background gradient layer */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(212,175,55,0.08),transparent_60%)] pointer-events-none" />

  <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

    {/* LEFT CONTENT */}
    <div className="space-y-6 md:space-y-8 text-center md:text-left">

      <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-sequel leading-tight">
        OMEGASTRIKE
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto md:mx-0">
        Professional BGMI Esports Organization built on structure,
        discipline, and competitive excellence.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">

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
    <div className="flex justify-center md:justify-end">

      <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] rounded-full bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 flex items-center justify-center">

        <Image
          src="/logo.png"
          alt="Omegastrike Logo"
          width={200}
          height={200}
          className="opacity-90 w-[140px] sm:w-[180px] md:w-[220px] h-auto"
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
          institution representing excellence in India.
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

{/* LATEST NEWS */}
<section className="py-32 px-6 border-t border-gold/10">
  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <div className="flex justify-between items-end mb-14">
      <div>
        <h2 className="text-4xl font-sequel mb-3">
          Latest News
        </h2>
        <p className="text-gray-400 max-w-xl">
          Official updates, roster changes and tournament results.
        </p>
      </div>

      <Link
        href="/news"
        className="text-sm text-gold hover:underline hidden sm:block"
      >
        View All →
      </Link>
    </div>

    {/* Loading */}
    {newsLoading && (
      <p className="text-center text-gray-400">
        Loading latest news...
      </p>
    )}

    {/* Empty */}
    {!newsLoading && news.length === 0 && (
      <p className="text-center text-gray-400">
        No news published yet.
      </p>
    )}

    {/* News Grid */}
    <div className="grid md:grid-cols-3 gap-8">

      {!newsLoading &&
        news.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.slug}`}
            className="group bg-neutral-900 border border-gold/10 rounded-xl overflow-hidden hover:border-gold/30 transition duration-300"
          >

            {/* Cover Image */}
            {item.cover_image && (
              <div className="h-48 overflow-hidden">
                <img
                  src={item.cover_image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6">

              <p className="text-xs text-gray-500 mb-3">
                {new Date(item.created_at).toLocaleDateString()}
              </p>

              <h3 className="text-lg font-semibold group-hover:text-gold transition">
                {item.title}
              </h3>

              {item.summary && (
                <p className="text-sm text-gray-400 mt-3 line-clamp-3">
                  {item.summary}
                </p>
              )}

            </div>
          </Link>
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
        Professional roster competing in national BGMI tournaments.
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
            className="bg-neutral-900/70 backdrop-blur-sm border border-gold/10 p-8 rounded-xl hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between min-h-[420px]"
          >

            {/* Avatar Placeholder */}
            <div className="h-32 mb-6 flex items-center justify-center">
              {player.image_url ? (
                 <img
                   src={player.image_url}
                   alt={player.name}
                   className="w-28 h-28 object-cover rounded-full border border-gold/30 group-hover:border-gold transition"
                />
              ) : (
                  <div className="w-28 h-28 rounded-full bg-neutral-800 border border-gold/20 flex items-center justify-center text-2xl font-semibold text-gold">
                    {player.name?.charAt(0)}
                  </div>
                  )}
            </div>

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

<Newsletter></Newsletter>

{/* FOOTER */}
<footer className="border-t border-gold/10 bg-black text-sm">

  {/* DESKTOP + TABLET */}
  <div className="hidden md:block py-16 px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 lg:grid-cols-4 gap-12">

      {/* BRAND */}
      <div>
        <h4 className="font-semibold mb-4 text-white">Omegastrike</h4>
        <p className="text-gray-400 leading-relaxed">
          Professional BGMI esports organization competing at national
          tournaments and building the next generation of competitive talent.
        </p>

        {/* SOCIAL */}
        <div className="flex gap-4 mt-6 text-gray-400">
          <a href="https://instagram.com/yourpage" target="_blank">
            <Instagram size={18} className="hover:text-white transition"/>
          </a>

          <a href="https://discord.gg/yourinvite" target="_blank">
            <MessageCircle size={18} className="hover:text-white transition"/>
          </a>
        </div>
      </div>

      {/* ORGANIZATION */}
      <div>
        <h4 className="font-semibold mb-4 text-white">Organization</h4>
        <ul className="space-y-2 text-gray-400">
          <li><Link href="/" className="hover:text-white transition">Home</Link></li>
          <li><Link href="/news" className="hover:text-white transition">News</Link></li>
          <li><Link href="/organization" className="hover:text-white transition">Organization</Link></li>
          <li><Link href="/media" className="hover:text-white transition">Media Kit</Link></li>
        </ul>
      </div>

      {/* COMPETITIVE */}
      <div>
        <h4 className="font-semibold mb-4 text-white">Competitive</h4>
        <ul className="space-y-2 text-gray-400">
          <li><Link href="/apply" className="hover:text-white transition">Join Team</Link></li>
          <li><Link href="/highlights" className="hover:text-white transition">Highlights</Link></li>
          <li><Link href="/achievements" className="hover:text-white transition">Achievements</Link></li>
        </ul>
      </div>

      {/* CONTACT */}
      <div>
        <h4 className="font-semibold mb-4 text-white">Contact</h4>
        <p className="text-gray-400">support@omegastrike.in</p>
        <p className="text-gray-400">admin@omegastrike.in</p>
      </div>

    </div>
  </div>


  {/* BOTTOM BAR (ALL DEVICES) */}
  <div className="border-t border-gold/10 py-6 px-6">

    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">

      {/* COPYRIGHT */}
      <div>
        © 2026 Omegastrike Esports
      </div>

      {/* LEGAL LINKS */}
      <div className="flex items-center gap-6">
        <Link href="/privacy-policy" className="hover:text-white transition">
          Privacy
        </Link>
        <Link href="/terms" className="hover:text-white transition">
          Terms
        </Link>
        <Link href="/cookie-policy" className="hover:text-white transition">
          Cookies
        </Link>
      </div>

    </div>

  </div>


  {/* MOBILE FOOTER BAR */}
  <div className="md:hidden fixed bottom-0 left-0 w-full bg-black border-t border-gold/10">

    <div className="flex items-center justify-around py-3 text-xs text-gray-400">

      <Link href="/" className="flex flex-col items-center gap-1 hover:text-white">
        <span>Home</span>
      </Link>

      <Link href="/news" className="flex flex-col items-center gap-1 hover:text-white">
        <span>News</span>
      </Link>

      <Link href="/apply" className="flex flex-col items-center gap-1 hover:text-white">
        <span>Join</span>
      </Link>

      <a
        href="https://discord.gg/yourinvite"
        target="_blank"
        className="flex flex-col items-center gap-1 hover:text-white"
      >
        <MessageCircle size={16}/>
      </a>

    </div>

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
