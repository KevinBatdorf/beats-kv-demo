import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "twind";

export function PlayStop(
  props: JSX.HTMLAttributes<HTMLButtonElement> & {
    isPlaying?: boolean;
    onClick?: (isPlaying: boolean) => void;
  },
) {
  return (
    <button
      {...props}
      type="button"
      disabled={!IS_BROWSER || props.disabled}
      className={tw(
        "focus:outline-none",
        {
          "text-[#FEDE5D]": props.isPlaying,
        },
      )}
      onClick={() => {
        props.onClick?.(!props.isPlaying);
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-16 h-16"
      >
        <path d="M15 6.75a.75.75 0 00-.75.75V18a.75.75 0 00.75.75h.75a.75.75 0 00.75-.75V7.5a.75.75 0 00-.75-.75H15zM20.25 6.75a.75.75 0 00-.75.75V18c0 .414.336.75.75.75H21a.75.75 0 00.75-.75V7.5a.75.75 0 00-.75-.75h-.75zM5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L5.055 7.061z" />
      </svg>

      <span className="sr-only">
        {props.isPlaying ? "Stop" : "Play"}
      </span>
    </button>
  );
}
