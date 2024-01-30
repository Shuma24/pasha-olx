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

type QueryKeyAdverts = [string, { page: number; limit: number }];

export const useOlxProducts = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['useOlxAdverts', { page, limit }] as QueryKeyAdverts,
    queryFn: ({ queryKey }) => {
      const [, { page, limit }] = queryKey;

      return getAdverts({ page, limit });
    },
    retry: 0,
    staleTime: 5 * 60 * 1000,
  });
};
