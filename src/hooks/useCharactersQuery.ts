import { useCallback, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { Character, RickAndMortyApiResponse } from "../api/models/models";

interface Props {
  inputFilter: string;
}

const useCharactersQuery = ({ inputFilter }: Props) => {
  const getCharacters = useCallback(
    (
      pageParam: number = 1
    ): Promise<AxiosResponse<RickAndMortyApiResponse<Character>>> => {
      return axios.get(
        `https://rickandmortyapi.com/api/character?${new URLSearchParams({
          page: pageParam.toString(),
          ...(inputFilter.length && { name: inputFilter }),
        })}`
      );
    },
    [inputFilter]
  );

  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["rick-and-morty-characters", inputFilter],
    queryFn: ({ pageParam }) => getCharacters(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.info.next ? allPages.length + 1 : undefined;
    },
  });

  const results = useMemo(() => {
    if (data) {
      return data?.pages.reduce((acc, curr) => {
        return [...acc, ...curr.data.results];
      }, [] as Character[]);
    }
    return [] as Character[];
  }, [data]);

  return {
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    data: results,
    fetchNextPage,
    isError,
  };
};

export default useCharactersQuery;
