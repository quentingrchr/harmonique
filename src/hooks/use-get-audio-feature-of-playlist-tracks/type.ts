export interface TrackWithAudioFeatures {
  id: string;
  image: {
    url: string;
    alt: string;
  };
  artists: string[];
  title: string;
  track_href: string;
  key: {
    value: TonalKey;
    confidence?: number;
  };
  mode: {
    value: TonalMode;
    confidence?: number;
  };
  tempo: {
    value: number;
    confidence?: number;
  };
}

export type TonalKey =
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
