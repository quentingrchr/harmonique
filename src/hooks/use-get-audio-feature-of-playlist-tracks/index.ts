import getClient from "@/libs/spotify/api";
import { AudioFeaturesObject, PlaylistTrackObject } from "@/libs/spotify/types";
import { modeToName, pitchToKey } from "@/utils/audio-feature";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { TrackWithAudioFeatures } from "./type";

export function useGetAudioFeatureOfPlaylistTracks(
  playlistTracks: PlaylistTrackObject[],
  playlistId: string
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
    queryKey: ["audio-features-of-playlist-tracks", playlistId],
    queryFn: () => {
      return client.get("/audio-features", {
        params: {
          ids: playlistTracks.map((track) => track.track.id).join(","),
        },
      });
    },
  });

  useEffect(() => {
    if (res?.data && res?.data.audio_features.length > 0) {
      const tracks = res.data.audio_features.map((audioFeature) => {
        const playlistTrackInfoIndex = playlistTracks.findIndex(
          (playlistTrack) => playlistTrack.track.id === audioFeature.id
        );

        return {
          id: audioFeature.id,
          image: {
            url: playlistTracks[playlistTrackInfoIndex].track.album.images[0]
              .url,
            alt: playlistTracks[playlistTrackInfoIndex].track.album.name,
          },
          artists: playlistTracks[playlistTrackInfoIndex].track.artists.map(
            (artist) => artist.name
          ),
          title: playlistTracks[playlistTrackInfoIndex].track.name,
          external_spotify_url:
            playlistTracks[playlistTrackInfoIndex].track.external_urls.spotify,
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
