"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  function toggleMusic() {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.volume = 0.25;
      audioRef.current.play();
    }

    setPlaying(!playing);
  }

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music/theme.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full backdrop-blur-xl bg-glass border border-gold/30 flex items-center justify-center hover:scale-110 transition"
        aria-label="Toggle background music"
      >
        {playing ? (
          <Volume2 className="text-gold" size={20} />
        ) : (
          <VolumeX className="text-gray-400" size={20} />
        )}
      </button>
    </>
  );
}
