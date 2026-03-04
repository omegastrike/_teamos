export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-32 px-6 text-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-sequel mb-8">Privacy Policy</h1>

      <p className="text-gray-400 mb-6">
        This Privacy Policy explains how Omegastrike Esports collects,
        uses, and protects your information when you use our website.
      </p>

      <Section title="Information We Collect">
        We may collect personal information such as your email address
        when you subscribe to our newsletter or contact us.
      </Section>

      <Section title="How We Use Information">
        We use collected information to improve our website,
        send updates, and communicate with users.
      </Section>

      <Section title="Cookies">
        Our website may use cookies to enhance user experience
        and analyze website traffic.
      </Section>

      <Section title="Data Protection">
        We take reasonable measures to protect your personal data.
      </Section>

      <Section title="Contact">
        For privacy questions contact:
        <br />
        admin@omegastrike.in
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
