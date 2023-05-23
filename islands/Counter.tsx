import { type StateUpdater, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface CounterProps {
  start: number;
}

async function fetchSetCount(newCount: number) {
  return await fetch(`/api/count?new_count=${newCount}`, { method: "POST" });
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.start);
  return (
    <div class="flex gap-2 w-full">
      <p class="flex-grow-1 font-bold text-xl">{count}</p>
      <Button
        onClick={async () => {
          const newCount = count - 1;
          const resp = await fetchSetCount(newCount);
          if (resp.ok) {
            setCount(newCount);
          }
        }}
      >
        -1
      </Button>
      <Button
        onClick={async () => {
          const newCount = count + 1;
          const resp = await fetchSetCount(newCount);
          if (resp.ok) {
            setCount(newCount);
          }
        }}
      >
        +1
      </Button>
    </div>
  );
}
