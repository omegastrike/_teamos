import Link from "next/link";
import { Download, Mail, Instagram, Youtube, Trophy, Users, Gamepad2 } from "lucide-react";
import PageBackground from "../../components/PageBackground";

export const metadata = {
  title: "Media Kit | Omegastrike",
};

export default function MediaPage() {
  return (
    <PageBackground>
      <main className="pt-32 pb-24 px-4 md:px-6 text-white max-w-7xl mx-auto">

        {/* HERO */}
        <section className="text-center mb-20">
          <h1 className="text-5xl font-sequel mb-4">
            Omegastrike Media Kit
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Official media resources, brand assets, and organization
            information for partners, tournament organizers and media outlets.
          </p>
        </section>


        {/* ORGANIZATION OVERVIEW */}
        <section className="mb-16 backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">
            Organization Overview
          </h2>

          <p className="text-gray-400 leading-relaxed mb-6">
            Omegastrike is a competitive BGMI esports organization from India.
            Built on the legacy of Oxygen Esports (2019–2020), the organization
            focuses on disciplined competitive development, strategic gameplay,
            and long-term growth in the esports ecosystem.
          </p>

          <ul className="text-gray-300 space-y-2">
            <li>• Founded: October 2025</li>
            <li>• Legacy Since: 2019</li>
            <li>• Region: India 🇮🇳</li>
            <li>• Primary Title: BGMI</li>
          </ul>
        </section>


        {/* ORGANIZATION STATS */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            Organization Stats
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <Stat icon={<Users size={20}/>} title="Active Players" value="4" />

            <Stat icon={<Gamepad2 size={20}/>} title="Primary Game" value="BGMI" />

            <Stat icon={<Trophy size={20}/>} title="Competitive Era" value="2019+" />

            <Stat icon={<Users size={20}/>} title="Region" value="India" />

          </div>
        </section>


        {/* COMPETITIVE FOCUS */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-8">
            Competitive Focus
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <Card
              title="BGMI Competition"
              desc="Primary focus on Battlegrounds Mobile India tournaments and competitive scrims."
            />

            <Card
              title="Strategic Gameplay"
              desc="Disciplined team structure with strong in-game leadership and tactical play."
            />

            <Card
              title="Long-Term Growth"
              desc="Developing a professional esports brand with competitive integrity."
            />

          </div>
        </section>


        {/* BRAND ASSETS */}
        <section className="mb-20 backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl p-8">

          <h2 className="text-2xl font-semibold mb-4">
            Brand Assets
          </h2>

          <p className="text-gray-400 mb-6">
            Download official Omegastrike logos and branding assets for media
            use and partnership materials.
          </p>

          <a
            href="/logo.png"
            download
            className="flex items-center justify-center w-56 h-12 rounded-full bg-gold text-black font-semibold hover:scale-105 transition"
          >
            <Download size={18} className="mr-2" />
            Download Logo
          </a>

        </section>


        {/* CONTACT */}
        <section className="backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl p-8 text-center">

          <h2 className="text-2xl font-semibold mb-6">
            Contact & Socials
          </h2>

          <p className="text-gray-400 mb-8">
            For partnerships, sponsorships, or media inquiries please contact us.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-gray-300">

            <div className="flex items-center gap-2">
              <Mail size={18} className="text-gold" />
              support@omegastrike.in
            </div>

            <a
              href="#"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <Instagram size={18} className="text-gold" />
              Instagram
            </a>

            <a
              href="#"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <Youtube size={18} className="text-gold" />
              YouTube
            </a>

          </div>

        </section>

      </main>
    </PageBackground>
  );
}


/* STAT CARD */

function Stat({ icon, title, value }) {
  return (
    <div className="backdrop-blur-xl bg-glass border border-gold/30 rounded-xl p-6 text-center">

      <div className="flex justify-center mb-2 text-gold">
        {icon}
      </div>

      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-xl font-semibold text-gold mt-1">{value}</p>

    </div>
  );
}


/* INFO CARD */

function Card({ title, desc }) {
  return (
    <div className="backdrop-blur-xl bg-glass border border-gold/30 rounded-xl p-6">

      <h3 className="font-semibold mb-2">{title}</h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        {desc}
      </p>

    </div>
  );
}
