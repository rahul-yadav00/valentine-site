"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Props = {
  slug: string;
};

const hearts = [
  // Core hearts
  "❤️","🩷","💖","💕","💘","💗","💓","💞","💝","💟","❣️","♥️",

  // Cute / emotional
  "😍","🥰","😘","😚","😻","🤍","🫶","🤗","🥹",

  // Sparkles / magic
  "✨","💫","⭐","🌟","🌠",

  // Flowers / romance
  "🌹","🌸","🌷","🌺","💐","🪷","🥀",

  // Soft aesthetic fillers
  "🎀","🦋","🍓","🍒","🍑","🍯","🍫",

  // Extra love symbols
  "💋","💍","👩‍❤️‍👨","👩‍❤️‍💋‍👨","💑",

  // Gentle emojis for variation
  "😊","😌","😇","🥹",

  // Tiny surprises
  "🕊️","🌈","☁️","🌙","🌤️",

  // Even more hearts (Unicode variants)
  "🧡","💛","💚","💙","💜","🤎","🖤","🤍",

  // Decorative vibes
  "🎶","🎵","📸","📷"
];



export default function Final({ slug }: Props) {
  const [yes, setYes] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-full w-full flex flex-col items-center justify-center text-center px-6 relative z-10 backdrop-blur-sm overflow-hidden"
    >
      {!yes && (
        <>
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl font-bold mb-4"
          >
            Will you be my Valentine? 💘
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-10 opacity-70"
          >
            Some feelings don’t need choices ✨
          </motion.p>

          <motion.button
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 0px pink",
                "0 0 25px hotpink",
                "0 0 0px pink",
              ],
            }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setYes(true)}
            className="bg-pink-500 text-white px-12 py-5 rounded-2xl shadow-xl text-2xl font-semibold"
          >
            YES ❤️
          </motion.button>
        </>
      )}

      <AnimatePresence>
        {yes && (
          <>
            {/* Smooth random heart shower */}
            {[...Array(35)].map((_, i) => {
              const size = Math.random() * 20 + 16;
              const xStart = Math.random() * 100;
              const xDrift = Math.random() * 60 - 30;
              const duration = Math.random() * 4 + 6;
              const delay = Math.random() * 3;
              const emoji = hearts[Math.floor(Math.random() * hearts.length)];

              return (
                <motion.div
                  key={i}
                  className="fixed z-20"
                  style={{
                    left: `${xStart}%`,
                    top: "-10%",
                    fontSize: `${size}px`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    y: "120vh",
                    x: xDrift,
                    rotate: Math.random() * 360,
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {emoji}
                </motion.div>
              );
            })}

            <motion.h1
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="text-5xl font-bold mb-4"
            >
              Forever starts now ❤️
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl"
            >
              Thank you for choosing me.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-2xl"
            >
              I love you endlessly 💕
            </motion.p>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
