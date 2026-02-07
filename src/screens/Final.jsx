"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Final() {
  const [yes, setYes] = useState(false);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-full w-full flex flex-col items-center justify-center text-center px-6 relative z-10 backdrop-blur-sm"
    >
      {!yes && (
        <>
          <h1 className="text-4xl font-bold mb-6">
            Will you be my Valentine? 💘
          </h1>

          <div className="flex gap-6">
            <button
              onClick={() => setYes(true)}
              className="bg-pink-500 hover:bg-pink-600 transition text-white px-8 py-4 rounded-xl shadow-lg text-lg active:scale-95"
            >
              YES ❤️
            </button>

            {/* Fake NO button */}
            <button className="opacity-0 pointer-events-none">
              NO 😈
            </button>
          </div>
        </>
      )}

      {yes && (
        <>
          {/* Confetti hearts */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed text-2xl z-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10%",
              }}
              animate={{ y: "120vh", rotate: 360 }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
              }}
            >
              💖
            </motion.div>
          ))}

          <h1 className="text-4xl font-bold mb-4">
            YAYYYY!!! ❤️
          </h1>

          <p className="text-lg">
            You just made me the happiest person alive.
          </p>

          <p className="mt-4 text-xl">
            I love you endlessly 💕
          </p>
        </>
      )}
    </motion.div>
  );
}
