export const dynamic = "force-dynamic";

import { User } from "lucide-react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Instagram, Youtube, Twitter, MessageCircle } from "lucide-react";

export default async function PlayerPage({ params }) {
  const { slug } = params;

  const { data: player, error } = await supabase
    .from("players")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !player) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          {player.name}
        </h1>

        <p className="text-gold mb-8">
          Role: {player.role}
        </p>

        {/* BIO + STATS STACK */}
        <div className="mt-10 space-y-12">

          {/* BIO */}
          {player.bio && (
            <div className="max-w-4xl backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl p-6">

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 border border-gold/30">
                  <User className="text-gold" size={18} />
                </div>

                <h2 className="text-xl font-semibold tracking-wide">
                  About Player
                </h2>
              </div>

              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {player.bio}
              </p>
            </div>
          )}

          {(player.instagram || player.youtube || player.twitter || player.discord) && (
  <div className="mt-8 flex gap-4 flex-wrap">

    {player.instagram && (
      <a href={player.instagram} target="_blank" className="social-btn">
        <Instagram size={18} />
      </a>
    )}

    {player.youtube && (
      <a href={player.youtube} target="_blank" className="social-btn">
        <Youtube size={18} />
      </a>
    )}

    {player.twitter && (
      <a href={player.twitter} target="_blank" className="social-btn">
        <Twitter size={18} />
      </a>
    )}

    {player.discord && (
      <a href={player.discord} target="_blank" className="social-btn">
        <MessageCircle size={18} />
      </a>
    )}

  </div>
)}

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard label="K/D Ratio" value={player.kd} />
            <StatCard label="Matches Played" value={player.matches} />
            <StatCard label="Wins" value={player.wins} />
          </div>

        </div>

      </div>
    </main>
  );
}

/* STAT CARD */
function StatCard({ label, value }) {
  return (
    <div className="backdrop-blur-xl bg-glass border border-gold/30 rounded-xl p-6 text-center">
      <p className="text-gray-400 text-sm mb-2">
        {label}
      </p>
      <p className="text-3xl font-bold text-gold">
        {value}
      </p>
    </div>
  );
}


