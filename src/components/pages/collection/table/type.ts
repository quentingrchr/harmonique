import { TonalAccidentalKey, TonalMode } from "@/types";

export interface TableTrackEntry {
  id: string;
  track: {
    image: {
      url: string;
      alt: string;
    };
    artists: string[];
    title: string;
    external_spotify_url: string;
  };
  keySignature: {
    key: {
      value: TonalAccidentalKey;
      confidence?: number;
    };
    mode: {
      value: TonalMode;
      confidence?: number;
    };
  };
  tempo: {
    value: number;
    confidence?: number;
  };
}
