import { notFound } from "next/navigation";

/* PLAYER STATS DATA */
const players = {
  Head: {
    name: "Head",
    role: "IGL",
    kd: 4.9,
    matches: 128,
    wins: 41,
  },
  Turbo: {
    name: "Turbo",
    role: "Assaulter",
    kd: 5.4,
    matches: 102,
    wins: 34,
  },
  Spike: {
    name: "Spike",
    role: "Support",
    kd: 4.1,
    matches: 115,
    wins: 39,
  },
  Octane: {
    name: "Octane",
    role: "Scout",
    kd: 4.6,
    matches: 109,
    wins: 31,
  },
};

export default function PlayerPage({ params }) {
  const player = players[params.slug];

  if (!player) {
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard label="K/D Ratio" value={player.kd} />
          <StatCard label="Matches Played" value={player.matches} />
          <StatCard label="Wins" value={player.wins} />
        </div>

      </div>
    </main>
  );
}

/* STAT CARD COMPONENT */
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
