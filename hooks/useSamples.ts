import { useEffect, useRef, useState } from "preact/hooks";
import * as Tone from "tone";
import type { Sound } from "../shared/types.ts";

export const useSamples = () => {
  const [loaded, setLoaded] = useState(false);
  const samples = useRef<Record<Sound, Tone.Player>>();

  useEffect(() => {
    const bass = new Tone.Player("/sounds/bass.wav")
      .toDestination();
    const clap = new Tone.Player("/sounds/clap.wav")
      .toDestination();
    const congaHigh = new Tone.Player("/sounds/conga-high.wav")
      .toDestination();
    const congaLow = new Tone.Player("/sounds/conga-low.wav")
      .toDestination();
    const hihat = new Tone.Player("/sounds/hihat.wav")
      .toDestination();
    const rim = new Tone.Player("/sounds/rim.wav")
      .toDestination();
    const shaker = new Tone.Player("/sounds/shaker.wav")
      .toDestination();
    const snare = new Tone.Player("/sounds/snare.wav")
      .toDestination();
    const tamb = new Tone.Player("/sounds/tamb.wav")
      .toDestination();
    samples.current = Object.freeze({
      bass,
      clap,
      congaHigh,
      congaLow,
      hihat,
      rim,
      shaker,
      snare,
      tamb,
    });
    Tone.loaded().then(() => setLoaded(true));
  }, []);

  return { loaded, samples: samples.current };
};
