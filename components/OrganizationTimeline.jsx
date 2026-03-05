"use client";

export default function OrganizationTimeline() {
  const events = [
    {
      year: "2019",
      title: "Oxygen Esports Founded",
      desc: "A group of passionate players formed Oxygen Esports to compete in PUBG Mobile and PUBG Mobile Lite. Built independently by the players themselves, the team began its journey in competitive scrims and community tournaments.",
    },
    {
      year: "2019 – 2020",
      title: "Competitive Scrim Era",
      desc: "Oxygen Esports actively competed in Tier 3, Tier 2, and Tier 1 scrims and tournaments, building competitive experience and team synergy.",
    },
    {
      year: "2020",
      title: "PUBG Ban & Team Disband",
      desc: "Following the PUBG Mobile ban in India, Oxygen Esports was forced to disband. Despite this, the players maintained their bond over the years.",
    },
    {
      year: "2023 – 2024",
      title: "Team Reunion",
      desc: "After completing their studies, the original players reunited and returned to competitive gaming, practicing BGMI together once again.",
    },
    {
      year: "October 2025",
      title: "Omegastrike Founded",
      desc: "The team founded Omegastrike, a new esports organization built on the legacy of Oxygen Esports with a renewed competitive vision.",
    },
    {
      year: "2026",
      title: "Competitive Expansion",
      desc: "Omegastrike continues developing its roster and competing in scrims and tournaments while building its esports presence.",
    },
  ];

  return (
    <section className="py-28 px-6 border-t border-gold/10">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-sequel mb-4">
            Our Journey
          </h2>
          <p className="text-gray-400">
            From Oxygen Esports to Omegastrike — our competitive story.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gold/20"></div>

          <div className="space-y-16">

            {events.map((event, i) => (
              <div key={i} className="relative pl-12">

                {/* Dot */}
                <div className="absolute left-0 top-1 w-8 h-8 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border-2 border-gold bg-black"></div>
                </div>

                {/* Card */}
                <div className="bg-neutral-900 border border-gold/10 rounded-lg p-6 hover:border-gold/30 transition">

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

              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
