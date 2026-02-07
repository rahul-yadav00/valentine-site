"use client";

import { motion } from "framer-motion";
import { useEffect, useState, memo } from "react";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function ScrollingPhotos({ slug }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`/data/${slug}.json`)
      .then(r => r.json())
      .then(data => {
        if (!data.background?.length) return;

        const shuffled = shuffle(data.background);

        setRows([
          shuffle(shuffled),
          shuffle(shuffled),
          shuffle(shuffled),
        ]);
      })
      .catch(console.error);
  }, [slug]);

  if (!rows.length) return null;

  const Row = ({ images, reverse = false }) => {
    const loop = [...images, ...images, ...images];

    return (
      <motion.div
        className="flex gap-[2px] w-max"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 60,
        }}
      >
        {loop.map((src, i) => (
          <img
            key={i}
            src={src}
            className="h-full w-auto object-cover rounded-xl"
            draggable={false}
          />
        ))}
      </motion.div>
    );
  };

  return (
    <div className="fixed inset-0 pointer-events-none opacity-25 p-[2px]">
      <div className="h-full grid grid-rows-3 gap-[2px] overflow-hidden">
        <Row images={rows[0]} />
        <Row images={rows[1]} reverse />
        <Row images={rows[2]} />
      </div>
    </div>
  );
}

export default memo(ScrollingPhotos);
