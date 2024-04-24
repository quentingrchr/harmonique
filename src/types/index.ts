export interface User {
  name: string;
  email: string;
  image: string;
}

export type MusicCollectionType = "album" | "playlist" | "artist";

export type TonalAccidentalKey =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";
export type TonalMode = "Major" | "Minor";
export type TonalSignature = `${TonalAccidentalKey} ${TonalMode}`;
