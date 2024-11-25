/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useMemo } from "react";
import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import { Episode } from "../api/models/models";

interface Props {
  episodes: string[];
}

const useRickAndMortyQuery = ({ episodes }: Props) => {
  const episodeIds = useMemo(() => {
    return episodes.map((episodeUrl) => episodeUrl.split("/").pop());
  }, [episodes]);

  const getEpisodes = useCallback((): Promise<
    AxiosResponse<Episode[] | Episode>
  > => {
    return axios.get(
      `https://rickandmortyapi.com/api/episode/${episodeIds}`
    );
  }, [episodeIds]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["rick-and-morty-episodes", episodeIds],
    queryFn: () => getEpisodes(),
  });

  return {
    isLoading,
    data: data?.data
      ? Array.isArray(data?.data)
        ? data.data
        : [data.data]
      : [],
    isError,
  };
};

export default useRickAndMortyQuery;
