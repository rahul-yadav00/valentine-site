"use client";

import { motion } from "framer-motion";

export default function Memories({ next }) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-full w-full flex flex-col items-center justify-center text-center px-6"
    >
      <h1 className="text-3xl font-bold mb-4">
        Do you remember us? 💕
      </h1>

      <p className="mb-6 text-lg">
        Every little moment with you means the world to me…
      </p>

      <button
        onClick={next}
        className="bg-pink-500 text-white px-6 py-3 rounded-xl shadow-lg active:scale-95"
      >
        Tell me more
      </button>
    </motion.div>
  );
}
