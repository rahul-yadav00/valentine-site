"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  next: () => void;
  slug: string;
};

export default function Memories({ next, slug }: Props) {
  const [personal, setPersonal] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/data/${slug}.json`)
      .then((r) => r.json())
      .then((d) => setPersonal(d.message || null))
      .catch(() => setPersonal(null));
  }, [slug]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-full w-full flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
    >
      {/* Ambient floating hearts */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [-10, 10, -10] }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          💕
        </motion.div>
      ))}

      {/* Headline */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-bold mb-4"
      >
        Do you remember us? ❤️
      </motion.h1>

      {/* Main line */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-lg mb-2"
      >
        Every little moment with you
      </motion.p>

      {/* Whisper line */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="text-lg opacity-70 mb-6"
      >
        means the world to me…
      </motion.p>

      {/* Personal card from message.txt */}
      {personal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          className="max-w-md bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 mb-8 shadow-lg text-sm leading-relaxed"
        >
          {personal}
        </motion.div>
      )}

      {/* CTA */}
      <motion.button
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 0px pink",
            "0 0 18px hotpink",
            "0 0 0px pink",
          ],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={next}
        className="bg-pink-500 text-white px-8 py-4 rounded-2xl shadow-xl text-lg font-semibold"
      >
        Tell me more 💌
      </motion.button>
    </motion.div>
  );
}
