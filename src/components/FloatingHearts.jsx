"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingHearts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed text-pink-400 text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-10%",
          }}
          animate={{
            y: "-120vh",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </>
  );
}
