"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">

      {/* Icon */}
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gold/10 border border-gold/30 mb-6">
        <AlertTriangle className="text-gold" size={36} />
      </div>

      {/* 404 Title */}
      <h1 className="text-5xl font-sequel tracking-wide mb-4">
        404
      </h1>

      <p className="text-xl text-gray-300 mb-2">
        Page Not Found
      </p>

      <p className="text-gray-500 max-w-md mb-8">
        The page you are looking for does not exist or has been removed.
      </p>

      {/* CTA Button */}
      <Link
        href="/"
        className="flex items-center justify-center h-12 px-8 rounded-full bg-gold text-black font-semibold hover:scale-105 transition"
      >
        Return to Home
      </Link>

    </main>
  );
}
