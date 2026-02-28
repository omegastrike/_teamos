"use client";

import Reveal from "../../components/Reveal";
import PageBackground from "../../components/PageBackground";

export default function HighlightsPage() {
  return (
    <PageBackground>
    <main className="pt-32 px-4 md:px-6 text-white max-w-6xl mx-auto">

      <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
        Gameplay Highlights
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {[1, 2, 3, 4].map((item) => (
          <Reveal key={item}>
            <div className="backdrop-blur-xl bg-glass border border-gold/20 rounded-2xl p-4 hover:scale-[1.02] transition duration-300">

              <div className="aspect-video mb-4">
                <iframe
                  className="w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <p className="text-sm text-gray-400">
                Omegastrike Tournament Highlight #{item}
              </p>

            </div>
          </Reveal>
        ))}

      </div>
    </main>
    </PageBackground>
  );
}
