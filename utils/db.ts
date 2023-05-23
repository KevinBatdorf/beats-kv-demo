const kv = await Deno.openKv();

const PREFIX = ["count"];

export async function getCount() {
  const res = await kv.get<number>(PREFIX);
  return res.value;
}

export async function setCount(newCount: number) {
  await kv.set(PREFIX, newCount);
}
