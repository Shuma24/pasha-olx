import { getTires } from '@/src/shared/api/api';
import { useQuery } from '@tanstack/react-query';

type QueryKeyAdverts = [string, { pageSize: number; skipPage: number; search?: string }];

export const useTiresProducts = (pageSize: number, skipPage: number, search?: string) => {
  return useQuery({
    queryKey: ['useListTires', { pageSize, skipPage, search }] as QueryKeyAdverts,
    queryFn: ({ queryKey }) => {
      const [, { pageSize, skipPage, search }] = queryKey;

      return getTires({ pageSize, skipPage, search });
    },
    retry: 0,
    staleTime: 5 * 60 * 1000,
  });
};
