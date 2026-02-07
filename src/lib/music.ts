// @ts-ignore
import { Howl } from "howler";


export function getMusic(src?: string) {
  if (!src) return null;

  return new Howl({
    src: [src],
    loop: true,
    volume: 0.6,
  });
}
