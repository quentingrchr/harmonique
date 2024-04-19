import getClient from "@/libs/spotify/api";
import { BrowsedPlaylistsResponse } from "@/libs/spotify/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategoryPlaylists({
  categoryId,
}: {
  categoryId: string;
}) {
  const client = getClient();
  const {
    data: res,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["categories-playlists", categoryId],
    queryFn: () => {
      return client.get(`browse/categories/${categoryId}/playlists`);
    },
  });

  return {
    data: res?.data as BrowsedPlaylistsResponse | undefined,
    error,
    isLoading,
  };
}
