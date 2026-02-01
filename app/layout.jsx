import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import BackgroundMusic from "@/components/BackgroundMusic";

/* English main font */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* ✅ Local Telugu font */
const teluguFont = localFont({
  src: "./fonts/font_telugu.ttf", // MUST be inside /app/fonts
  variable: "--font-telugu",
  display: "swap",
});

export const metadata = {
  title: "Omegastrike",
  description:
    "Omegastrike is a professional BGMI esports organisation from India.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${teluguFont.variable}`}>
        <div
    className="fixed inset-0 -z-10 bg-no-repeat bg-center bg-cover opacity-50"
    style={{ backgroundImage: "url('/bg-texture.png')" }}
        />
        <BackgroundMusic />
        {children}
      </body>
    </html>
  );
}
