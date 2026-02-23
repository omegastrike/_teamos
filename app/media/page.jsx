import Link from "next/link";
import { Download, Mail, Instagram, Youtube } from "lucide-react";

export const metadata = {
  title: "Media Kit | Omegastrike",
};

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl font-sequel mb-6">
          Omegastrike Media Kit
        </h1>

        <p className="text-gray-400 mb-12 max-w-2xl">
          Omegastrike is a competitive BGMI esports organization from India,
          focused on building elite talent and a strong digital presence.
        </p>

        {/* Organization Overview */}
        <section className="mb-16 backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Organization Overview
          </h2>

          <ul className="text-gray-300 space-y-2">
            <li>• Founded: 2026</li>
            <li>• Region: India 🇮🇳</li>
            <li>• Game: BGMI</li>
            <li>• Focus: Competitive tournaments & brand growth</li>
          </ul>
        </section>

        {/* Brand Assets */}
        <section className="mb-16 backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Brand Assets
          </h2>

          <p className="text-gray-400 mb-6">
            Download official logos and brand materials.
          </p>

          <a
            href="/logo.png"
            download
            className="flex items-center justify-center w-52 h-12 rounded-full bg-gold text-black font-semibold hover:scale-105 transition"
          >
            <Download size={18} className="mr-2" />
            Download Logo
          </a>
        </section>

        {/* Contact */}
        <section className="backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-6">
            Contact & Socials
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 text-gray-300">

            <div className="flex items-center gap-2">
              <Mail size={18} className="text-gold" />
              support@omegastrike.in
            </div>

            <div className="flex items-center gap-2">
              <Instagram size={18} className="text-gold" />
              Instagram
            </div>

            <div className="flex items-center gap-2">
              <Youtube size={18} className="text-gold" />
              YouTube
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
