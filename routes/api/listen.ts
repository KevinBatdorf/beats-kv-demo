import { Handlers } from "$fresh/server.ts";
import { getTrack, PREFIX } from "../../services/db.ts";

const FULL_UPDATE_INTERVAL = 3_000;

export const handler: Handlers = {
  GET() {
    const bc = new BroadcastChannel(PREFIX);
    let timerId: number | undefined;

    const body = new ReadableStream({
      async start(controller) {
        controller.enqueue(`retry: 1000\n\n`);

        async function queueFullUpdate() {
          timerId = undefined;
          try {
            const track = await getTrack();
            controller.enqueue(`data: ${JSON.stringify(track)}\n\n`);
          } finally {
            timerId = setTimeout(queueFullUpdate, FULL_UPDATE_INTERVAL);
          }
        }

        await queueFullUpdate();
      },
      cancel() {
        bc.close();
        if (typeof timerId === "number") clearInterval(timerId);
      },
    });

    return new Response(body.pipeThrough(new TextEncoderStream()), {
      headers: {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
      },
    });
  },
};
