"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe } from "lucide-react";

export default function Navbar({ language, setLanguage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
      ${
        scrolled
          ? "backdrop-blur-xl bg-black/60 border-b border-gold/30"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Omegastrike Logo"
            width={36}
            height={36}
            priority
          />
          <span className="font-bold tracking-wider text-lg">
            OMEGASTRIKE
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 text-sm">

          <NavItem href="/apply" label="Apply" />
          <NavItem href="/partner" label="Partner" />
          <NavItem href="/contact" label="Contact" />

          {/* LANGUAGE TOGGLE */}
          <button
            onClick={() => setLanguage(language === "en" ? "te" : "en")}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 hover:bg-gold/10 transition"
          >
            <Globe size={16} />
            <span className="uppercase text-xs">
              {language}
            </span>
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg border border-gold/40"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden backdrop-blur-xl bg-black/80 border-t border-gold/30 px-6 py-6 space-y-4">

          <MobileNavItem href="/apply" label="Apply" setOpen={setOpen} />
          <MobileNavItem href="/partner" label="Partner" setOpen={setOpen} />
          <MobileNavItem href="/contact" label="Contact" setOpen={setOpen} />

          <button
            onClick={() => {
              setLanguage(language === "en" ? "te" : "en");
              setOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-gold/40 hover:bg-gold/10 transition"
          >
            <Globe size={16} />
            Switch Language
          </button>
        </div>
      )}
    </header>
  );
}

/* DESKTOP LINK */
function NavItem({ href, label }) {
  return (
    <Link
      href={href}
      className="relative group text-gray-300 hover:text-white transition"
    >
      {label}
      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gold transition-all group-hover:w-full"></span>
    </Link>
  );
}

/* MOBILE LINK */
function MobileNavItem({ href, label, setOpen }) {
  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className="block text-center text-lg font-medium hover:text-gold transition"
    >
      {label}
    </Link>
  );
}
