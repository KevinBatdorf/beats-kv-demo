// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/api/listen.ts";
import * as $1 from "./routes/api/update.ts";
import * as $2 from "./routes/index.tsx";
import * as $$0 from "./islands/Beats.tsx";

const manifest = {
  routes: {
    "./routes/api/listen.ts": $0,
    "./routes/api/update.ts": $1,
    "./routes/index.tsx": $2,
  },
  islands: {
    "./islands/Beats.tsx": $$0,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
