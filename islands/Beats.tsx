import { useEffect, useState } from "preact/hooks";
import * as Tone from "tone";
import { Sound, Track } from "../shared/types.ts";
import { useSamples } from "../hooks/useSamples.ts";
import { soundNames } from "../shared/constants.ts";
import { tw } from "twind";
import { useSounds } from "../hooks/useSounds.ts";
import { Note } from "../components/Note.tsx";
import { PlayStop } from "../components/PlayStop.tsx";

export default function Beats() {
  const { samples, loaded } = useSamples();
  const {
    count,
    track,
    isPlaying,
    updateTrack: updateSingle,
    updateTracks,
    addSamples,
    start,
    stop,
  } = useSounds();
  const [selectedSound, setSelectedSound] = useState<Sound | undefined>("bass");

  const updateTrack = async (index: number, sounds: Sound[]) => {
    if (!track) return;
    if (index < 0 || index > 15) throw new Error("Invalid index");
    updateSingle(index, sounds);
    const resp = await fetch("/api/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([index, sounds]),
    });
    if (!resp.ok) {
      console.error("Failed to update");
    }
  };

  useEffect(() => {
    if (!loaded || !samples) return;
    addSamples(samples);
  }, [loaded]);

  useEffect(() => {
    const eventSource = new EventSource("/api/listen");
    eventSource.onmessage = (e) => {
      updateTracks(JSON.parse(e.data) as Track);
    };
    return () => eventSource.close();
  }, []);

  return (
    <div className="flex flex-col gap-6 mt-6">
      <h1 className="text-2xl md:text-5xl text-center">Multiplayer KV beats</h1>
      <div className="flex gap-3 flex-row-reverse md:relative -left-12 mx-auto">
        <div className="flex flex-wrap text-xl md:text-7xl p-6 bg-[#272335] w-[240px] h-[240px] md:w-[368px] md:h-[368px] shadow-md">
          {Object.keys(track ?? {}).map((k) => {
            const key = Number(k);
            return (
              <div key={key}>
                <Note
                  hasSound={selectedSound &&
                    track?.[key]?.includes(selectedSound)}
                  currentNote={(key === count) && isPlaying}
                  onClick={() => {
                    if (!selectedSound) return;
                    const sounds = track?.[key] ?? [];
                    if (track?.[key]?.includes(selectedSound)) {
                      const removed = sounds.filter((s) => s !== selectedSound);
                      return updateTrack(key, removed);
                    }
                    updateTrack(key, [...sounds, selectedSound]);
                  }}
                >
                  {key + 1}
                </Note>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-0.5 md:gap-1 items-end justify-end">
          {soundNames.map((key) => (
            <div key={key}>
              <button
                type="button"
                disabled={!loaded}
                aria-pressed={selectedSound === key}
                className={tw("focus:outline-none", {
                  "text-[#ff7edb]": selectedSound === key,
                })}
                onClick={() => {
                  if (selectedSound === key) {
                    setSelectedSound(undefined);
                    return;
                  }
                  setSelectedSound(key as Sound);
                  if (isPlaying) return;
                  samples?.[key as Sound]?.start(Tone.now());
                }}
              >
                {key}
              </button>
            </div>
          ))}
          <div class="md:flex items-center justify-center md:relative -right-1 mt-1">
            <PlayStop
              isPlaying={isPlaying}
              onClick={(isPlaying) => isPlaying ? start() : stop()}
            />
          </div>
        </div>
      </div>
      <div class="p-4 flex flex-col md:flex-row md:justify-between gap-2 md:gap-8 text-center font-sans">
        <a
          href="https://github.com/KevinBatdorf/beats-kv-demo"
          class="text-blue-500 hover:underline"
        >
          View Source on GitHub
        </a>
        <a href="https://deno.com/deploy" class="text-blue-500 hover:underline">
          Powered by Deno Deploy
        </a>
      </div>
    </div>
  );
}
