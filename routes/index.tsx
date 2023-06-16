import Beats from "../islands/Beats.tsx";
import { asset, Head } from "$fresh/runtime.ts";

export default function Home() {
  return (
    <>
      <Head>
        <title>Multiplayer Beats KV</title>
        <meta name="description" content="A multiplayer beat machine" />
        <link rel="stylesheet" href={asset("fonts/fonts.css")} />
      </Head>
      <div
        class="p-4 mx-auto max-w-screen-md flex justify-center"
        style={{ fontFamily: "Orbitron" }}
      >
        <Beats />
      </div>
    </>
  );
}
