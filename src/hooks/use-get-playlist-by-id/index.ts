import getClient from "@/libs/spotify/api";
import { PlaylistObject } from "@/libs/spotify/types";
import { useQuery } from "@tanstack/react-query";

export function useGetPlaylistByIdQuery(id: string) {
  const client = getClient();
  const {
    data: res,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => {
      return client.get(`/playlists/${id}`);
    },
  });

  return {
    data: res?.data as PlaylistObject | undefined,
    error,
    isLoading,
  };
}

export default useGetPlaylistByIdQuery;