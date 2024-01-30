import { TokenExchange, getAdverts, getOlxCredentials } from '@/src/shared/api/api';
import { useQuery } from '@tanstack/react-query';

export const useOlxExchange = (code: string) => {
  return useQuery({
    queryKey: ['olxExchange'],
    queryFn: async () => {
      const data = await TokenExchange({ code: code });
      return data;
    },
    retry: 0,
  });
};

export const useOlxCredentials = () => {
  return useQuery({
    queryKey: ['useOlxCredentials'],
    queryFn: getOlxCredentials,
    retry: 0,
    staleTime: 5 * 60 * 1000,
  });
};

type QueryKeyAdverts = [string, { offset: number; limit: number }];

export const useOlxProducts = (offset: number, limit: number) => {
  return useQuery({
    queryKey: ['useOlxAdverts', { offset, limit }] as QueryKeyAdverts,
    queryFn: ({ queryKey }) => {
      const [, { offset, limit }] = queryKey;

      return getAdverts({ offset, limit });
    },
    retry: 0,
    staleTime: 5 * 60 * 1000,
  });
};
