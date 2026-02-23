"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Loader from "@/components/Loader";
import Reveal from "@/components/Reveal";
import Navbar from "@/components/Navbar";
import { translations } from "@/lib/translations";
import { supabase } from "@/lib/supabase";

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

  return (
    <>
      <Loader isLoading={loading} />
      <Navbar language={language} setLanguage={setLanguage} />

      {!loading && (
        <main className="pt-24 overflow-x-hidden">

          {/* HERO */}
          <Reveal>
            <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
              <div className="mb-6">
                <Image
                  src="/logo.png"
                  alt="Omegastrike Logo"
                  width={160}
                  height={160}
                  priority
                  className="drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]"
                />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
                OMEGASTRIKE
              </h1>

              <p className="mt-2 text-gray-400 text-sm">
                {t.heroSubtitle}
              </p>

              <p className="mt-4 max-w-xl text-gray-300 text-sm md:text-base">
                {t.heroDesc}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  href="/apply"
                  className="flex items-center justify-center h-12 px-8 rounded-full bg-gold text-black font-semibold hover:scale-105 transition"
                >
                  Join the Strike
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center justify-center h-12 px-8 rounded-full border border-gold/50 hover:bg-gold/10 transition"
                >
                  Watch Highlights
                </Link>
              </div>
            </section>
          </Reveal>

          {/* ABOUT */}
          <Reveal>
            <section className="py-24 px-6 flex justify-center">
              <div className="max-w-3xl backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl p-8 text-center">
                <h2 className="text-3xl font-semibold mb-4">
                  {t.aboutTitle}
                </h2>
                <p className="text-gray-300">
                  {t.aboutDesc}
                </p>
              </div>
            </section>
          </Reveal>

          {/* BGMI ROSTER */}
          <Reveal>
            <section className="py-24 px-6">
              <h2 className="text-center text-3xl font-semibold mb-12">
                {t.rosterTitle}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">

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
                  players.map((p, i) => {
                    const Icon = roleIcons[p.role];

                    return (
                      <Reveal delay={i * 0.1} key={p.slug}>
                        <div className="backdrop-blur-xl bg-glass border border-gold/30 rounded-xl p-6 text-center hover:scale-105 transition">

                          {Icon && (
                            <div className="flex justify-center mb-3">
                              <Icon size={22} className="text-gold" />
                            </div>
                          )}

                          <Link
                            href={`/players/${p.slug}`}
                            className="text-xl font-semibold hover:text-gold transition"
                          >
                            {p.name}
                          </Link>

                          <p className="text-gold text-sm mt-2">
                            {p.role}
                          </p>
                        </div>
                      </Reveal>
                    );
                  })}
              </div>
            </section>
          </Reveal>

          {/* FOUNDERS */}
<Reveal>
  <section className="py-24 px-6">
    <h2 className="text-center text-3xl font-semibold mb-12">
      Leadership
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">

      {founders.map((f, i) => (
        <Reveal delay={i * 0.1} key={f.name}>
          <div className="backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl p-8 text-center hover:scale-105 transition">

            {/* AVATAR */}
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-gold/10 border border-gold/30 text-gold text-xl font-bold">
              {f.name.charAt(0)}
            </div>

            {/* NAME */}
            <h3 className="text-xl font-semibold mb-1">
              {f.name}
            </h3>

            {/* ROLE */}
            <p className="text-gold text-sm mb-4">
              {f.role}
            </p>

            {/* DESCRIPTION */}
            <p className="text-gray-400 text-sm leading-relaxed">
              {f.desc}
            </p>

          </div>
        </Reveal>
      ))}

    </div>
  </section>
</Reveal>

          {/* SPONSORS MARQUEE */}
<section className="py-20 relative">

  <h2 className="text-center text-3xl font-sequel mb-10">
    Our Sponsors
  </h2>

  <div className="relative w-full overflow-x-hidden overflow-y-visible py-6">

    {/* TOP/BOTTOM DEPTH OVERLAY */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent pointer-events-none z-10" />

    {/* LEFT FADE */}
    {/* <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-20" /> */}

    {/* RIGHT FADE */}
    {/* <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-20" /> */}

    {/* MARQUEE CONTAINER */}
    <div className="flex gap-16 animate-marquee whitespace-nowrap relative z-0">

      {[
        "Your Brand Here",
        "Official Partner",
        "Title Sponsor",
        "Now Partnering",
        "Strategic Partner",
        "Become a Sponsor",
      ]
        .concat([
          "Your Brand Here",
          "Official Partner",
          "Title Sponsor",
          "Now Partnering",
          "Strategic Partner",
          "Become a Sponsor",
        ])
        .map((name, i) => (
          <div key={i} className="w-[240px] flex-shrink-0 flex justify-center">

            {/* FLOAT WRAPPER (separate transform layer) */}
            <div
              style={{ animationDelay: `${i * 0.3}s` }}
              className="float-soft w-full h-[110px] flex items-center justify-center text-center
           px-6
           backdrop-blur-md bg-white/[0.04]
           border border-gold/20 rounded-2xl
           opacity-70 hover:opacity-100
           hover:border-gold
           hover:shadow-[0_0_25px_rgba(212,175,55,0.15)]
           hover:scale-[1.05]
           transition-all duration-300"
            >
              <span className="text-gray-400 tracking-wider text-sm uppercase">
                {name}
              </span>
            </div>

          </div>
        ))}

    </div>
  </div>
</section>

          {/* SOCIALS */}
          <Reveal>
  <section className="py-24 px-6 text-center">
    <h2 className="text-3xl font-semibold mb-6">
      {t.connectTitle}
    </h2>

    {/* SOCIAL LINKS */}
    <div className="flex justify-center gap-6 mb-12 flex-wrap">

      {/* INSTAGRAM */}
      <a
        href="https://instagram.com/omegastrike.esports/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 backdrop-blur-xl bg-glass border border-gold/30 
                   rounded-full px-6 py-3 
                   hover:scale-105 hover:border-gold 
                   hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]
                   transition-all duration-300"
      >
        <Instagram size={18} />
        Instagram
      </a>

      {/* YOUTUBE */}
      <a
        href="https://youtube.com/@octane29"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 backdrop-blur-xl bg-glass border border-gold/30 
                   rounded-full px-6 py-3 
                   hover:scale-105 hover:border-gold 
                   hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]
                   transition-all duration-300"
      >
        <Youtube size={18} />
        YouTube
      </a>

      {/* DISCORD */}
      <a
        href="https://discord.gg/myEtkWjawk"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 backdrop-blur-xl bg-glass border border-gold/30 
                   rounded-full px-6 py-3 
                   hover:scale-105 hover:border-gold 
                   hover:shadow-[0_0_25px_rgba(212,175,55,0.25)]
                   transition-all duration-300"
      >
        <MessageCircle size={18} />
        Discord
      </a>

    </div>

    {/* CTA BUTTONS */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

      <Link
        href="/apply"
        className="flex items-center justify-center h-12 px-8 rounded-full border border-gold/50 hover:bg-gold/10 transition"
      >
        Apply to Clan
      </Link>

      <Link
        href="/partner"
        className="flex items-center justify-center h-12 px-10 rounded-full bg-gold text-black font-semibold hover:scale-105 transition"
      >
        {t.partnerBtn}
      </Link>

      <Link
        href="/contact"
        className="flex items-center justify-center h-12 px-8 rounded-full border border-gold/50 hover:bg-gold/10 transition"
      >
        Contact Us
      </Link>

    </div>
  </section>
</Reveal>

          {/* FOOTER */}
          <footer className="py-10 text-center text-sm text-gray-500 space-y-4">

  {/* CONTACT EMAILS */}
  <div className="flex flex-col sm:flex-row justify-center items-center gap-6">

    {/* SUPPORT */}
    <a
      href="mailto:support@omegastrike.in"
      className="flex items-center gap-2 hover:text-gold transition"
    >
      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 border border-gold/30">
        <Mail size={16} className="text-gold" />
      </span>
      <span>
        Support <span className="text-gray-300"></span>
      </span>
    </a>

    {/* ADMIN */}
    <a
      href="mailto:admin@omegastrike.in"
      className="flex items-center gap-2 hover:text-gold transition"
    >
      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 border border-gold/30">
        <ShieldCheck size={16} className="text-gold" />
      </span>
      <span>
        Admin <span className="text-gray-300"></span>
      </span>
    </a>

  </div>

  {/* DIVIDER */}
  <div className="w-24 h-px bg-gold/30 mx-auto" />

  {/* COPYRIGHT */}
  <div className="space-y-1">
    <div>© 2026 Omegastrike Esports · BGMI · India 🇮🇳</div>
    <div className="text-gray-600">
      Designed & Developed by Octane
    </div>
  </div>

</footer>
        </main>
      )}
    </>
  );
}
