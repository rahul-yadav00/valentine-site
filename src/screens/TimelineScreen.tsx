"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  onNext: () => void;
  slug: string;
};

const META = [
  ["first-meet", "First Meet", "The day everything started ❤️"],
  ["first-chat", "First Chat", "Endless late night talks 💬"],
  ["first-date", "First Date", "Nervous smiles and coffee ☕"],
  ["first-trip", "First Trip", "Memories forever ✈️"],
  ["today", "Today", "Still choosing you every day 💍"],
];

export default function TimelineScreen({ onNext, slug }: Props) {
  const [events, setEvents] = useState<any[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    fetch(`/data/${slug}.json`)
      .then(r => r.json())
      .then(data => {
        const built = META.map(([key, title, desc]) => ({
          title,
          desc,
          images: data.timeline?.[key] || [],
        })).filter(e => e.images.length);

        setEvents(built);
      })
      .catch(console.error);
  }, [slug]);

  if (!events.length) return null;

  return (
    <motion.div className="absolute inset-0 text-white px-6 py-10 overflow-y-auto">

      {/* MODAL */}
      <AnimatePresence>
        {active !== null && (
          <motion.div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center px-6">

            <img
              src={events[active].images[photoIndex]}
              className="max-h-[70vh] rounded-3xl shadow-2xl"
            />

            {events[active].images.length > 1 && (
              <div className="flex gap-6 mt-6 text-4xl">
                <button onClick={() => setPhotoIndex(p => (p - 1 + events[active].images.length) % events[active].images.length)}>‹</button>
                <button onClick={() => setPhotoIndex(p => (p + 1) % events[active].images.length)}>›</button>
              </div>
            )}

            <button
              onClick={() => {
                setActive(null);
                setPhotoIndex(0);
              }}
              className="mt-8 bg-white/20 px-6 py-3 rounded-full"
            >
              ← Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <h1 className="text-3xl font-bold mb-8 text-center">Our Journey</h1>

      <div className="max-w-xl mx-auto space-y-5">
        {events.map((e, i) => (
          <motion.div
            key={i}
            onClick={() => setActive(i)}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className="cursor-pointer bg-white/10 backdrop-blur-lg rounded-2xl p-4 hover:bg-white/20 hover:scale-[1.02] transition"
          >
            <div className="text-lg font-semibold">{e.title}</div>
            <div className="text-sm opacity-80">{e.desc}</div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNext}
          className="mt-10 px-8 py-3 bg-pink-500 rounded-full shadow-lg hover:scale-105 transition"
        >
          Continue ❤️
        </button>
      </div>

    </motion.div>
  );
}
