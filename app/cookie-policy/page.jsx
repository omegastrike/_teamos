import PageBackground from "../../components/PageBackground";

export const metadata = {
  title: "Cookie Policy | Omegastrike",
};

export default function CookiePolicy() {
  return (
    <PageBackground>
      <main className="min-h-screen pt-32 pb-24 px-6 text-white max-w-4xl mx-auto">

        <h1 className="text-4xl font-sequel mb-8">Cookie Policy</h1>

        <p className="text-gray-400 mb-8">
          This Cookie Policy explains how Omegastrike uses cookies and
          similar technologies to enhance your browsing experience.
        </p>

        <Section title="1. What Are Cookies">
          Cookies are small data files stored on your device that help
          websites remember user preferences and improve functionality.
        </Section>

        <Section title="2. Types of Cookies We Use">

          <ul className="list-disc pl-6 text-gray-400 space-y-1">
            <li>Essential cookies for website functionality</li>
            <li>Analytics cookies for performance monitoring</li>
            <li>Preference cookies for saving settings</li>
            <li>Security cookies for protecting the website</li>
          </ul>

        </Section>

        <Section title="3. Managing Cookies">
          Users can disable cookies through their browser settings.
          However, disabling cookies may affect certain website features.
        </Section>

        <Section title="4. Third-Party Cookies">
          Some cookies may be placed by third-party services used
          by Omegastrike such as analytics or embedded media.
        </Section>

        <Section title="5. Updates to This Policy">
          This cookie policy may be updated periodically to reflect
          changes in technology or regulations.
        </Section>

      </main>
    </PageBackground>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="text-gray-400 leading-relaxed">{children}</div>
    </div>
  );
}
