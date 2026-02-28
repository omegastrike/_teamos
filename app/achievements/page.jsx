"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Reveal from "../../components/Reveal";
import PageBackground from "../../components/PageBackground";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let channel;

    async function fetchAchievements(isRealtime = false) {
      if (!isRealtime) setLoading(true);

      const { data, error } = await supabase
        .from("achievements")
        .select("*")
        .order("position", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        setAchievements(data || []);
      }

      if (!isRealtime) setLoading(false);
    }

    // Initial load
    fetchAchievements(false);

    // Realtime updates
    channel = supabase
      .channel("achievements-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "achievements" },
        () => fetchAchievements(true)
      )
      .subscribe();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  return (
  <PageBackground>
    <main className="pt-32 px-4 md:px-6 text-white">

      {/* PAGE HEADER */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-sequel">
          Achievements
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Our competitive milestones and tournament performances.
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-400">
          Loading achievements...
        </p>
      )}

      {/* EMPTY */}
      {!loading && achievements.length === 0 && (
        <p className="text-center text-gray-400">
          No achievements yet.
        </p>
      )}

      {/* ACHIEVEMENTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {!loading &&
          achievements.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.05}>
              <div className="backdrop-blur-xl bg-glass border border-gold/30 rounded-2xl p-6 hover:scale-[1.03] transition duration-300 h-full flex flex-col justify-between">

                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {a.title}
                  </h2>

                  <p className="text-gold text-sm mb-2">
                    {a.placement}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {a.event}
                  </p>

                  {a.year && (
                    <p className="text-gray-500 text-xs mt-1">
                      {a.year}
                    </p>
                  )}
                </div>

                {a.prize && (
                  <div className="mt-4 text-sm text-gray-300">
                    Prize: {a.prize}
                  </div>
                )}

              </div>
            </Reveal>
          ))}

      </div>
    </main>
  </PageBackground>
);
}
