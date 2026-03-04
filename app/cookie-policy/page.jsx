export const metadata = {
  title: "Cookie Policy",
};

export default function CookiePolicy() {
  return (
    <main className="min-h-screen pt-32 px-6 text-white max-w-4xl mx-auto">
      <h1 className="text-4xl font-sequel mb-8">Cookie Policy</h1>

      <Section title="What Are Cookies">
        Cookies are small text files stored on your device
        that help improve website functionality and analytics.
      </Section>

      <Section title="How We Use Cookies">
        We use cookies to remember preferences,
        improve performance, and analyze traffic.
      </Section>

      <Section title="Managing Cookies">
        You can disable cookies through your browser settings.
      </Section>

      <Section title="Consent">
        By continuing to use our website you consent to
        our use of cookies.
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
