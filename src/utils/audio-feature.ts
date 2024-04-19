import { TableTrackEntry } from "@/components/pages/collection/table/type";
import {
  TonalKey,
  TonalMode,
  TrackWithAudioFeatures,
} from "@/hooks/use-get-audio-feature-of-playlist-tracks/type";

export function pitchToKey(pitch: number) {
  const keys: TonalKey[] = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];

  // Normalize pitch to a value between 0 and 11
  const normalizedPitch = (pitch + 12) % 12;

  return keys[normalizedPitch];
}

export function modeToName(mode: number) {
  const modes: TonalMode[] = ["Minor", "Major"];

  if (mode >= 0 && mode < modes.length) {
    return modes[mode];
  } else {
    throw new Error(
      "Invalid mode number. Please provide 0 for Major and 1 for Minor."
    );
  }
}

export function trackWithAudioFeaturesToTableTrackEntry(
  track: TrackWithAudioFeatures
): TableTrackEntry {
  return {
    id: track.id,
    track: {
      image: track.image,
      artists: track.artists,
      title: track.title,
      external_spotify_url: track.external_spotify_url,
    },
    key: {
      value: track.key.value,
      confidence: 0.9,
    },
    mode: {
      value: track.mode.value,
      confidence: 0.9,
    },
    tempo: {
      value: track.tempo.value,
      confidence: 0.9,
    },
  };
}
