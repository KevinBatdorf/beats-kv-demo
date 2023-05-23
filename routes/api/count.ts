import { Handlers } from "$fresh/server.ts";
import { setCount } from "../../utils/db.ts";

export const handler: Handlers = {
  async POST(req) {
    const newCount = await new URL(req.url).searchParams.get("new_count");
    if (isNaN(Number(newCount))) return new Response(null, { status: 400 });

    await setCount(Number(newCount));
    return new Response();
  },
};
