import OrganizationTimeline from "../../components/OrganizationTimeline";

export const metadata = {
  title: "Organization",
  description:
    "Leadership and management team behind Omegastrike Esports.",
};

export default function OrganizationPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 text-white">

      {/* Background Glow Layers */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_25%_15%,rgba(212,175,55,0.08),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_85%,rgba(212,175,55,0.05),transparent_70%)]" />

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-20 text-center">

          {/* Founded Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs tracking-widest uppercase mb-6">
            Founded in 2025
          </div>

          <h1 className="text-4xl md:text-5xl font-sequel mb-6">
            Organization
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Structured leadership. Competitive excellence. 
            A professional esports organization built for sustained dominance.
          </p>

        </div>

        {/* EXECUTIVE TEAM */}
        <SectionTitle title="Executive Leadership" />

        <div className="grid md:grid-cols-2 gap-10 mb-28">

          <OrgCard
            name="Vinay Gandham"
            role="Founder & Chief Executive Officer"
            desc="Responsible for long-term vision, strategic expansion, and organizational growth."
          />

          <OrgCard
            name="ShankarNath Dukka"
            role="Co-Founder & Head of Operations"
            desc="Leads competitive planning, player development, and tournament execution."
          />

        </div>

        <OrganizationTimeline />

        {/* MANAGEMENT TEAM */}
        <SectionTitle title="Management & Performance Staff" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <OrgCard
            name="Team Manager"
            role="Competitive Management"
            desc="Coordinates scrims, tournament entries and internal team structure."
          />

          <OrgCard
            name="Analyst"
            role="Performance Analytics"
            desc="Provides opponent analysis, statistical insights and meta adaptation."
          />

          <OrgCard
            name="Content Director"
            role="Media & Brand Strategy"
            desc="Oversees content production, sponsorship media and digital growth."
          />

        </div>

      </div>
    </main>
  );
}

/* SECTION TITLE */
function SectionTitle({ title }) {
  return (
    <div className="mb-14">
      <h2 className="text-2xl font-semibold border-l-4 border-gold pl-4 tracking-wide">
        {title}
      </h2>
    </div>
  );
}

/* ORG CARD */
function OrgCard({ name, role, desc }) {
  return (
    <div className="relative bg-neutral-900 border border-gold/10 p-8 rounded-xl 
                    hover:border-gold/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)]
                    transition duration-300">

      {/* Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold/60 to-transparent" />

      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 mb-6 flex items-center justify-center text-gold font-bold text-xl">
        {name.charAt(0)}
      </div>

      <h3 className="text-lg font-semibold mb-2">
        {name}
      </h3>

      <p className="text-gold text-sm mb-4 tracking-wide">
        {role}
      </p>

      <p className="text-gray-400 text-sm leading-relaxed">
        {desc}
      </p>

    </div>
  );
}
