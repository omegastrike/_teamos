import PageBackground from "../../components/PageBackground";

export const metadata = {
  title: "Terms of Service | Omegastrike",
};

export default function TermsPage() {
  return (
    <PageBackground>
      <main className="min-h-screen pt-32 pb-24 px-6 text-white max-w-4xl mx-auto">

        <h1 className="text-4xl font-sequel mb-8">Terms of Service</h1>

        <p className="text-gray-400 mb-8">
          These Terms govern your access to and use of the Omegastrike
          website and related esports services.
        </p>

        <Section title="1. Acceptance of Terms">
          By accessing this website, you agree to comply with these terms
          and all applicable laws and regulations.
        </Section>

        <Section title="2. Use of Website">
          Users agree not to misuse the website, attempt unauthorized
          access to systems, distribute malicious content, or disrupt
          normal operations.
        </Section>

        <Section title="3. Esports Content">
          All team branding, player content, media assets, and published
          materials belong to Omegastrike and may not be reused without
          permission.
        </Section>

        <Section title="4. Community Conduct">
          Users interacting with Omegastrike platforms are expected to
          maintain respectful behavior within esports communities,
          including social media and Discord platforms.
        </Section>

        <Section title="5. External Links">
          Our website may contain links to third-party websites.
          Omegastrike is not responsible for external content or services.
        </Section>

        <Section title="6. Limitation of Liability">
          Omegastrike is not responsible for damages resulting from
          website interruptions, technical issues, or third-party
          integrations.
        </Section>

        <Section title="7. Modifications">
          These terms may be updated periodically to reflect changes
          in operations or legal requirements.
        </Section>

      </main>
    </PageBackground>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-400 leading-relaxed">{children}</p>
    </div>
  );
}
