"use client";

import Reveal from "./Reveal";

export default function OrganizationTimeline() {

  const events = [
    {
      year: "2019",
      title: "Oxygen Esports Founded",
      desc: "A group of passionate players formed Oxygen Esports to compete in PUBG Mobile and PUBG Mobile Lite. The team was built independently and began competing in community tournaments and scrims.",
    },
    {
      year: "2019 — 2020",
      title: "Competitive Scrim Era",
      desc: "Oxygen Esports competed in Tier 3, Tier 2 and Tier 1 scrims and tournaments, building competitive discipline and strong team synergy.",
    },
    {
      year: "2020",
      title: "PUBG Ban & Team Disband",
      desc: "After PUBG Mobile was banned in India, Oxygen Esports was forced to disband. However the bond between the players remained strong.",
    },
    {
      year: "2023 — 2024",
      title: "Team Reunion",
      desc: "After finishing their education, the original players reunited and began playing BGMI again, rebuilding their competitive chemistry.",
    },
    {
      year: "October 2025",
      title: "Omegastrike Founded",
      desc: "The players decided to build a new professional organization called Omegastrike, continuing the legacy of Oxygen Esports.",
    },
    {
      year: "2026",
      title: "Competitive Expansion",
      desc: "Omegastrike continues developing its roster and competing in scrims and tournaments while building a professional esports brand.",
    },
  ];

  return (
    <section className="py-32 px-6 border-t border-gold/10">

      <div className="max-w-6xl mx-auto">

        {/* LEGACY BADGE */}
        <div className="text-center mb-20">

          <span className="inline-block px-5 py-2 rounded-full border border-gold/40 text-gold text-sm tracking-wide mb-6">
            Legacy: Oxygen Esports (2019–2020)
          </span>

          <h2 className="text-4xl md:text-5xl font-sequel mb-4">
            Our Journey
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto">
            From Oxygen Esports to Omegastrike — a journey built on years of
            friendship, competition, and passion for esports.
          </p>

        </div>


        {/* TIMELINE */}
        <div className="relative">

          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gold/20 transform -translate-x-1/2"></div>


          <div className="space-y-24">

            {events.map((event, i) => {

              const left = i % 2 === 0;

              return (

                <Reveal key={i} delay={i * 0.1}>

                  <div className="relative flex items-center justify-between">

                    {/* LEFT CARD */}
                    {left && (
                      <div className="w-full md:w-[45%] bg-neutral-900 border border-gold/10 p-6 rounded-xl hover:border-gold/30 transition">

                        <span className="text-gold text-sm font-semibold">
                          {event.year}
                        </span>

                        <h3 className="text-lg font-semibold mt-1">
                          {event.title}
                        </h3>

                        <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                          {event.desc}
                        </p>

                      </div>
                    )}

                    {!left && <div className="hidden md:block w-[45%]"></div>}

                    {/* CENTER DOT */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full border-2 border-gold bg-black"></div>

                    {/* RIGHT CARD */}
                    {!left && (
                      <div className="w-full md:w-[45%] bg-neutral-900 border border-gold/10 p-6 rounded-xl hover:border-gold/30 transition">

                        <span className="text-gold text-sm font-semibold">
                          {event.year}
                        </span>

                        <h3 className="text-lg font-semibold mt-1">
                          {event.title}
                        </h3>

                        <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                          {event.desc}
                        </p>

                      </div>
                    )}

                    {left && <div className="hidden md:block w-[45%]"></div>}

                  </div>

                </Reveal>

              );

            })}

          </div>

        </div>

      </div>

    </section>
  );
}
