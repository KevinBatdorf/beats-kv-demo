import { useEffect } from "preact/hooks";
import * as Tone from "tone";
import { Sound, Track } from "../shared/types.ts";
import { useSignal } from "@preact/signals";

type SampleRecord = Record<Sound, Tone.Player>;

export const useSounds = () => {
  const track = useSignal<Record<keyof Track, Sound[]>>({});
  const samples = useSignal<SampleRecord | undefined>(undefined);
  const count = useSignal(0);
  const isPlaying = useSignal(false);

  const start = () => {
    isPlaying.value = true;
    count.value = 0;
    Tone.Transport.position = 0;
    Tone.start();
    Tone.Transport?.start();
  };

  const stop = () => {
    isPlaying.value = false;
    Tone.Transport?.stop();
  };

  const updateTrack = (index: keyof Track, sounds: Sound[]) => {
    track.value = { ...track.value, [index]: sounds };
  };

  const updateTracks = (tracks: Record<keyof Track, Sound[]>) => {
    track.value = { ...tracks };
  };

  useEffect(() => {
    Tone.Transport.bpm.value = 88;

    const id = new Tone.Loop((time: number) => {
      if (!track.peek()) return;
      const [
        _bars,
        quarterNotes,
        sixteenthNotes,
      ] = Tone.Transport.position.split(":");

      const c = Number(quarterNotes) * 4 + Math.round(sixteenthNotes);
      setTimeout(() => {
        count.value = c as keyof Track;
      }, sixteenthNotes.split(".")[1] === "0" ? 0 : 150);

      track.peek()[c]?.forEach((sound) => {
        if (!samples.peek()) return;
        samples?.peek?.()?.[sound]?.start(time);
      });
    }, "16n").start(0);

    return () => id.dispose();
  }, []);

  return {
    count: count.value,
    track: track.value,
    isPlaying: isPlaying.value,
    loading: !samples.value,
    addSamples: (s: SampleRecord) => samples.value = s,
    updateTrack,
    updateTracks,
    start,
    stop,
  };
};
