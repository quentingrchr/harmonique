import getClient from "@/libs/spotify/api";
import { AudioAnalysisObject } from "@/libs/spotify/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export function useGetLowLevelAudioAnalysis(trackId: string) {
  const client = getClient();
  const {
    data: res,
    error,
    isLoading,
  } = useQuery<AxiosResponse<AudioAnalysisObject>, AxiosError>({
    queryKey: ["low-level-audio-analysis", trackId],
    queryFn: () => {
      return client.get(`/audio-analysis/${trackId}`);
    },
  });

  return {
    data: res?.data,
    error,
    isLoading,
  };
}
