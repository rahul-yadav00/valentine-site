"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Intro from "../../screens/Intro";
import TimelineScreen from "../../screens/TimelineScreen";
import Memories from "../../screens/Memories";
import Question from "../../screens/Question";
import Final from "../../screens/Final";

import FloatingHearts from "../../components/FloatingHearts";
import ScrollingPhotos from "../../components/ScrollingPhotos";

import { getMusic } from "../../lib/music";

export default function Home() {
  const [screen, setScreen] = useState(0);
  const [music, setMusic] = useState<any>(null);

  const params = useParams();
  const slug = params.slug as string;

  // Load JSON + setup music
  useEffect(() => {
    fetch(`/data/${slug}.json`)
      .then(r => r.json())
      .then(data => {
        const m = getMusic(data.music);
        setMusic(m);
      })
      .catch(console.error);
  }, [slug]);

  // First click → start music
  useEffect(() => {
    if (!music) return;

    const startMusic = () => {
      music.play();
      window.removeEventListener("click", startMusic);
    };

    window.addEventListener("click", startMusic);

    return () => window.removeEventListener("click", startMusic);
  }, [music]);

  return (
    <main className="relative h-screen w-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <ScrollingPhotos slug={slug} />
      </div>

      {/* HEARTS */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <FloatingHearts />
      </div>

      {/* FOREGROUND */}
      <div className="relative z-20 h-full w-full flex items-center justify-center">

        {screen === 0 && <Intro next={() => setScreen(1)} slug={slug} />}

        {screen === 1 && <Memories next={() => setScreen(2)} slug={slug} />}

        {screen === 2 && <TimelineScreen onNext={() => setScreen(3)} slug={slug} />}

        {screen === 3 && <Question next={() => setScreen(4)} slug={slug} />}

        {screen === 4 && <Final slug={slug} />}

      </div>

    </main>
  );
}
