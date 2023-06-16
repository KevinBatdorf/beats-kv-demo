export type Sound =
  | "bass"
  | "clap"
  | "congaHigh"
  | "congaLow"
  | "hihat"
  | "rim"
  | "shaker"
  | "snare"
  | "tamb";

export type Track = {
  [key: number]: Sound[];
};
