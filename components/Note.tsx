import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "twind";

export function Note(
  props: JSX.HTMLAttributes<HTMLButtonElement> & {
    hasSound?: boolean;
    currentNote?: boolean;
  },
) {
  return (
    <button
      {...props}
      type="button"
      disabled={!IS_BROWSER || props.disabled}
      className={tw(
        "w-20 h-20 flex items-center justify-center p-6 focus:outline-none text-white",
        {
          "bg-[#FEDE5D]": props.currentNote,
          "bg-[#ff7edb]": props.hasSound,
        },
      )}
    />
  );
}
