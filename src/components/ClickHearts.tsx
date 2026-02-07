"use client";

import { useEffect } from "react";

export default function ClickHearts() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const heart = document.createElement("div");

      heart.innerText = "💗";

      heart.style.position = "fixed";
      heart.style.left = `${e.clientX - 10}px`;
      heart.style.top = `${e.clientY - 10}px`;
      heart.style.pointerEvents = "none";
      heart.style.fontSize = "18px";
      heart.style.zIndex = "9999";
      heart.style.transition = "all 600ms ease-out";

      document.body.appendChild(heart);

      requestAnimationFrame(() => {
        heart.style.transform = "scale(2)";
        heart.style.opacity = "0";
        heart.style.top = `${e.clientY - 40}px`;
      });

      setTimeout(() => heart.remove(), 600);
    };

    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, []);

  return null;
}
