import getClient from "@/libs/spotify/api";
import { PlaylistObject } from "@/libs/spotify/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export default function useGetPlaylistById() {
  const client = getClient();
  const mutation = useMutation<
    AxiosResponse<PlaylistObject>,
    AxiosError,
    string
  >({
    mutationFn: (id) => {
      return client.get(`/playlists/${id}`);
    },
  });

  return mutation;
}

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
