import { Track } from "../shared/types.ts";

const kv = await Deno.openKv();

export const PREFIX = "track";

export async function setTrack(i: number, sounds: string[]): Promise<string> {
  const res = await kv.set([PREFIX, i], sounds);
  const bc = new BroadcastChannel(PREFIX);
  bc.postMessage({ i, sounds });
  setTimeout(() => bc.close(), 5);
  return res;
}

export async function getTrack(): Promise<Track> {
  const track: Track = {} as Track;
  for (let i = 0; i < 16; i++) {
    track[i] = [];
  }

  for await (const entry of kv.list({ prefix: [PREFIX] })) {
    const index = entry.key[1];
    track[index] = entry.value;
  }
  return track;
}
