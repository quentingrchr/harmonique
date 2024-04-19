import getClient from "@/libs/spotify/api";
import { BrowsedPlaylistsResponse } from "@/libs/spotify/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetFeaturedPlaylists() {
  const client = getClient();
  const {
    data: res,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["featured-playlists"],
    queryFn: () => {
      return client.get("/browse/featured-playlists");
    },
  });

  return {
    data: res?.data as BrowsedPlaylistsResponse | undefined,
    error,
    isLoading,
  };
}
