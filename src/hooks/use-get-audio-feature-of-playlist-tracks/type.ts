import { TonalAccidentalKey, TonalMode } from "@/types";

export interface TrackWithAudioFeatures {
  id: string;
  image: {
    url: string;
    alt: string;
  };
  artists: string[];
  title: string;
  external_spotify_url: string;
  key: {
    value: TonalAccidentalKey;
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
