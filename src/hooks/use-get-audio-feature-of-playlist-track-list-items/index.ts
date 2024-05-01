import { TrackListItem } from "@/components/pages/collection/tracks-list/type";
import getClient from "@/libs/spotify/api";
import { AudioFeaturesObject } from "@/libs/spotify/types";
import { modeToName, pitchToKey } from "@/utils/audio-feature";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { TrackWithAudioFeatures } from "./type";

export function useGetAudioFeatureOfTrackListItems(
  trackListItems: TrackListItem[],
  id: string
) {
  const [tracks, setTracks] = useState<TrackWithAudioFeatures[]>([]);
  const client = getClient();
  const {
    data: res,
    error,
    isLoading,
  } = useQuery<
    AxiosResponse<{
      audio_features: AudioFeaturesObject[];
    }>
  >({
    queryKey: ["audio-features-of-track-list-items", id],
    queryFn: () => {
      return client.get("/audio-features", {
        params: {
          ids: trackListItems.map((track) => track.id).join(","),
        },
      });
    },
  });

  useEffect(() => {
    if (res?.data && res?.data.audio_features.length > 0) {
      const tracks = res.data.audio_features.map((audioFeature) => {
        const playlistTrackInfoIndex = trackListItems.findIndex(
          (t) => t.id === audioFeature.id
        );

        return {
          id: audioFeature.id,
          image: {
            url: trackListItems[playlistTrackInfoIndex].album.images[0].url,
            alt: trackListItems[playlistTrackInfoIndex].album.name,
          },
          artists: trackListItems[playlistTrackInfoIndex].artists.map(
            (artist) => artist.name
          ),
          title: trackListItems[playlistTrackInfoIndex].name,
          external_spotify_url:
            trackListItems[playlistTrackInfoIndex].external_urls.spotify,
          key: {
            value: pitchToKey(audioFeature.key),
          },
          mode: {
            value: modeToName(audioFeature.mode),
          },
          tempo: {
            value: audioFeature.tempo,
          },
        };
      });

      setTracks(tracks);
    }
  }, [res]);

  return {
    error,
    isLoading,
    data: tracks,
  };
}
