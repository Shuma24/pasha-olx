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

export const useOlxProducts = () => {
  return useQuery({
    queryKey: ['useOlxAdverts'],
    queryFn: getAdverts,
    retry: 0,
    staleTime: 5 * 60 * 1000,
  });
};
