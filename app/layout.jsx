import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import BackgroundMusic from "../components/BackgroundMusic";

/* English main font */
const inter = Inter({
  subsets: ["latin"],
  variable: "font_telugu",
  display: "swap",
});

/* ✅ Local Telugu font */
const teluguFont = localFont({
  src: "../app/fonts/font_telugu.ttf", // MUST be inside /app/fonts
  variable: "font_telugu",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://omegastrike.in"),
  title: {
    default: "Omegastrike Esports",
    template: "%s | Omegastrike",
  },

  icons: {
    icon: "/favicon.png",
    // apple: "/apple-icon.png",
  },
  
  description:
    "Omegastrike is a professional BGMI esports organization from India competing in national tournaments.",
  keywords: [
    "Omegastrike",
    "BGMI team India",
    "Esports India",
    "BGMI roster",
    "BGMI tournaments",
    "Indian esports organization"
  ],
  openGraph: {
    title: "Omegastrike Esports",
    description:
      "Professional BGMI esports organization from India.",
    url: "https://omegastrike.in",
    siteName: "Omegastrike",
    images: [
      {
        url: "/og1.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omegastrike Esports",
    description:
      "Professional BGMI esports organization from India.",
    images: ["/og1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${teluguFont.variable}`}>
        <div
    className="fixed inset-0 -z-10 bg-no-repeat bg-center bg-cover opacity-10"
    style={{ backgroundImage: "url('/bg-texture.png')" }}
        />
        <BackgroundMusic />
        {children}
      </body>
    </html>
  );
}
