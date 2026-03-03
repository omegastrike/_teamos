export const metadata = {
  title: "Organization",
  description:
    "Leadership and management team behind Omegastrike Esports.",
};

export default function OrganizationPage() {
  return (
    <main className="relative min-h-screen pt-32 px-6 text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.06),transparent_60%)]" />

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-sequel mb-4">
            Organization
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The leadership and management team driving Omegastrike’s competitive success.
          </p>
        </div>

        {/* EXECUTIVE TEAM */}
        <SectionTitle title="Executive Leadership" />

        <div className="grid md:grid-cols-2 gap-10 mb-24">

          <OrgCard
            name="Ramesh"
            role="Founder & CEO"
            desc="Visionary behind Omegastrike, responsible for strategic direction and long-term growth."
          />

          <OrgCard
            name="ShankarNath"
            role="Co-Founder & Operations"
            desc="Oversees team operations, competitive planning, and player development."
          />

        </div>

        {/* MANAGEMENT TEAM */}
        <SectionTitle title="Management & Staff" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <OrgCard
            name="Team Manager"
            role="Competitive Management"
            desc="Coordinates scrims, tournaments and team logistics."
          />

          <OrgCard
            name="Analyst"
            role="Performance Analysis"
            desc="Provides statistical insights and opponent breakdown."
          />

          <OrgCard
            name="Content Head"
            role="Media & Branding"
            desc="Handles content strategy, social presence and media production."
          />

        </div>

      </div>
    </main>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold border-l-4 border-gold pl-4">
        {title}
      </h2>
    </div>
  );
}

function OrgCard({ name, role, desc }) {
  return (
    <div className="bg-neutral-900 border border-gold/10 p-8 rounded-xl hover:border-gold/30 transition">

      {/* Avatar Placeholder */}
      <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 mb-6 flex items-center justify-center text-gold font-bold text-xl">
        {name.charAt(0)}
      </div>

      <h3 className="text-lg font-semibold mb-2">
        {name}
      </h3>

      <p className="text-gold text-sm mb-4">
        {role}
      </p>

      <p className="text-gray-400 text-sm leading-relaxed">
        {desc}
      </p>

    </div>
  );
}
