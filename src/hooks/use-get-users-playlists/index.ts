import getClient from "@/libs/spotify/api";
import { PagedItems, SimplifiedPlaylistObject } from "@/libs/spotify/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetUsersPlaylists() {
  const client = getClient();
  const {
    data: res,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users-playlists"],
    queryFn: () => {
      return client.get("/me/playlists");
    },
  });

  return {
    data: res?.data as PagedItems<SimplifiedPlaylistObject> | undefined,
    error,
    isLoading,
  };
}
