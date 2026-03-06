import PageBackground from "../../components/PageBackground";

export const metadata = {
  title: "Privacy Policy | Omegastrike",
};

export default function PrivacyPolicy() {
  return (
    <PageBackground>
      <main className="min-h-screen pt-32 pb-24 px-6 text-white max-w-4xl mx-auto">

        <h1 className="text-4xl font-sequel mb-8">Privacy Policy</h1>

        <p className="text-gray-400 mb-8">
          This Privacy Policy describes how Omegastrike collects, uses,
          and protects information when users interact with our website,
          esports services, and community platforms.
        </p>

        <Section title="1. Information We Collect">
          We may collect personal information including your name, email
          address, social media links, and other information submitted
          through forms such as team applications, contact forms,
          newsletter subscriptions, and partnership inquiries.
        </Section>

        <Section title="2. Usage Data">
          We may automatically collect technical information such as:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Pages visited on our website</li>
            <li>Device type and operating system</li>
            <li>Time and date of visits</li>
          </ul>
        </Section>

        <Section title="3. How We Use Information">
          We use collected data to:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Improve our esports organization website</li>
            <li>Manage team applications and recruitment</li>
            <li>Respond to inquiries and support requests</li>
            <li>Send important updates and newsletters</li>
            <li>Analyze website performance and traffic</li>
          </ul>
        </Section>

        <Section title="4. Data Protection">
          Omegastrike implements reasonable technical and organizational
          measures to protect user information against unauthorized
          access, alteration, or disclosure.
        </Section>

        <Section title="5. Third-Party Services">
          Our website may use third-party services including:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Supabase (database services)</li>
            <li>Vercel (hosting infrastructure)</li>
            <li>Analytics providers</li>
            <li>Social media integrations</li>
          </ul>
          These providers have their own privacy policies.
        </Section>

        <Section title="6. User Rights">
          Users have the right to:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Request access to stored personal data</li>
            <li>Request correction or deletion of personal data</li>
            <li>Withdraw consent from communications</li>
          </ul>
        </Section>

        <Section title="7. Policy Updates">
          This policy may be updated periodically to reflect operational,
          legal, or regulatory changes.
        </Section>

      </main>
    </PageBackground>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>

      <div className="text-gray-400 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}
