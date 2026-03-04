export const metadata = {
  title: "Terms of Service",
};

export default function Terms() {
  return (
    <main className="min-h-screen pt-32 px-6 text-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-sequel mb-8">Terms of Service</h1>

      <Section title="Acceptance of Terms">
        By accessing this website you agree to comply with
        these terms and conditions.
      </Section>

      <Section title="Intellectual Property">
        All content including logos, branding, and media
        belongs to Omegastrike Esports unless stated otherwise.
      </Section>

      <Section title="Use of Website">
        Users must not misuse the website or attempt to
        disrupt its functionality.
      </Section>

      <Section title="External Links">
        Our site may link to external websites. We are not
        responsible for their content or privacy practices.
      </Section>

      <Section title="Changes to Terms">
        We may update these terms at any time.
      </Section>
    </main>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-3 text-gold">{title}</h2>
      <p className="text-gray-400 leading-relaxed">{children}</p>
    </div>
  );
}
