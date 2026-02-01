"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-40 h-40">
            <svg viewBox="0 0 48 48" width="100%" height="100%">

              {/* ✅ SOLID MASK SHAPE */}
              <defs>
                <clipPath id="helmetMask">
                  <path
                    d="
                      M10 22
                      C10 12, 38 12, 38 22
                      V34
                      C38 38, 10 38, 10 34
                      Z
                    "
                  />
                </clipPath>
              </defs>

              {/* 💧 LIQUID FILL (THIS WAS MISSING EFFECTIVE MASK) */}
              <motion.rect
                x="0"
                y="48"
                width="48"
                height="48"
                fill="#D4AF37"
                clipPath="url(#helmetMask)"
                animate={{ y: [48, 14] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* 🪖 YOUR HELMET OUTLINE (VISIBLE TOP LAYER) */}
              <g
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.0138,14.3044A16.7755,16.7755,0,0,1,43.5,25.2707" />
                <path d="M43.5,25.2707a53.8219,53.8219,0,0,1-1.1358,10.552" />
                <path d="M14.0138,14.3044l-.8583,1.2526a2.7924,2.7924,0,0,0-2.3294,2.1894" />
                <path d="M13.1555,15.557A36.2623,36.2623,0,0,1,26.111,17.92C32.89,20.5222,35.3585,22.7186,36.24,24.003a2.2076,2.2076,0,0,1-.3125,2.9189" />
                <path d="M29.962,24.7416c-4.904-4.6748-21.6232-8.1163-22.4784-6.7091" />
                <path d="M6.8689,20.6017s-1.89,3.1076-1.2484,3.56" />
                <path d="M26.7722,32.2094s-7.6944-4.17-13.2084-5.0324" />
                <path d="M30.4769,35.4237l2.7208-8.3866" />
              </g>

              {/* DETAILS */}
              <circle cx="26.15" cy="25.41" r="0.75" fill="#D4AF37" />
              <circle cx="24.5" cy="28.79" r="0.75" fill="#D4AF37" />
            </svg>
          </div>

          <motion.p
            className="mt-6 text-gold tracking-widest text-sm"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.4 }}
          >
            LOADING STRIKE…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
