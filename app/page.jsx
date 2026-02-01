"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import Reveal from "@/components/Reveal";

import { translations } from "@/lib/translations";

import {
  Instagram,
  Youtube,
  MessageCircle,
  Crosshair,
  Zap,
  Shield,
  Eye,
} from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en");

  const t = translations[language];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  /* ✅ BGMI ROSTER DATA (LOWERCASE SLUGS – FINAL) */
  const roster = [
    { name: "Head", slug: "Head", role: "IGL", icon: Crosshair },
    { name: "Turbo", slug: "Turbo", role: "Assaulter", icon: Zap },
    { name: "Spike", slug: "Spike", role: "Support", icon: Shield },
    { name: "Octane", slug: "Octane", role: "Scout", icon: Eye },
  ];

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

              <p className="mt-2 text-gray-400 text-sm">{t.heroSubtitle}</p>

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
                <p className="text-gray-300">{t.aboutDesc}</p>
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
                {roster.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <Reveal delay={i * 0.1} key={i}>
                      <div className="backdrop-blur-xl bg-glass border border-gold/30 rounded-xl p-6 text-center hover:scale-105 transition">

                        <div className="flex justify-center mb-3">
                          <Icon size={22} className="text-gold" />
                        </div>

                        <Link
                          href={`/players/${p.slug}`}
                          className="text-xl font-semibold hover:text-gold transition"
                        >
                          {p.name}
                        </Link>

                        <p className="text-gold text-sm mt-2">{p.role}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          </Reveal>

          {/* SOCIALS + CTA */}
          <Reveal>
            <section className="py-24 px-6 text-center">
              <h2 className="text-3xl font-semibold mb-6">
                {t.connectTitle}
              </h2>

              <div className="flex justify-center gap-6 mb-10 flex-wrap">
                <a className="flex items-center gap-3 backdrop-blur-xl bg-glass border border-gold/30 rounded-full px-6 py-3 hover:scale-105 transition">
                  <Instagram size={18} /> Instagram
                </a>
                <a className="flex items-center gap-3 backdrop-blur-xl bg-glass border border-gold/30 rounded-full px-6 py-3 hover:scale-105 transition">
                  <Youtube size={18} /> YouTube
                </a>
                <a className="flex items-center gap-3 backdrop-blur-xl bg-glass border border-gold/30 rounded-full px-6 py-3 hover:scale-105 transition">
                  <MessageCircle size={18} /> Discord
                </a>
              </div>

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
          <footer className="py-6 text-center text-gray-500 text-sm space-y-1">
  <div>
    © 2026 Omegastrike Esports · BGMI · India 🇮🇳
  </div>
  <div className="text-gray-600">
    Designed & Developed by Octane
  </div>
</footer>
        </main>
      )}
    </>
  );
}
