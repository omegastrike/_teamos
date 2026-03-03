"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader({ isLoading }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 600); // smooth exit
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-700 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative flex items-center justify-center">

        {/* Rotating Ring */}
        <div className="absolute w-40 h-40 rounded-full border-2 border-gold/30 border-t-gold animate-spin-slow" />

        {/* Glow Pulse */}
        <div className="absolute w-32 h-32 rounded-full bg-gold/10 blur-2xl animate-pulse" />

        {/* Logo */}
        <Image
          src="/logo.png"
          alt="Omegastrike Logo"
          width={80}
          height={80}
          priority
          className="z-10"
        />

      </div>
    </div>
  );
}
