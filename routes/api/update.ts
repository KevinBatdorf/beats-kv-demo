import { Handlers } from "$fresh/server.ts";
import { setTrack } from "../../services/db.ts";
import { soundNames } from "../../shared/constants.ts";

const allValidSounds = (sounds: string[]) =>
  sounds.every((name: string) => soundNames.includes(name));

export const handler: Handlers = {
  async POST(req) {
    const [index, sounds] = await req.json();

    if (index < 0 || index >= 16) {
      return Response.json("invalid index", { status: 400 });
    }
    if (!allValidSounds(sounds)) {
      return Response.json("invalid sounds", { status: 400 });
    }
    return Response.json(await setTrack(index, sounds));
  },
};
