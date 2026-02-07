"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function Question({ next }) {
  const noRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!noRef.current) return;

    const rect = noRef.current.getBoundingClientRect();

    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);

    const distance = Math.sqrt(dx * dx + dy * dy);

    // If cursor comes within 120px → RUN 😈
    if (distance < 120) {
      setPos({
        x: Math.random() * 300 - 150,
        y: Math.random() * 300 - 150,
      });
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="h-full w-full flex flex-col items-center justify-center text-center px-6"
    >
      <h1 className="text-3xl font-bold mb-6">
        Do you love me? 🥺
      </h1>

      <div className="flex gap-10 mt-4 relative">
        <button
          onClick={next}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl shadow-lg"
        >
          Yes ❤️
        </button>

        <motion.button
          ref={noRef}
          animate={pos}
          transition={{ type: "spring", stiffness: 120 }}
          className="bg-gray-300 px-6 py-3 rounded-xl shadow"
        >
          No 😈
        </motion.button>
      </div>
    </div>
  );
}
