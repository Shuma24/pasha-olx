import { getOlxAuthLink } from '@/src/shared/api/api';
import { useQuery } from '@tanstack/react-query';

const key = ['olxLoginPage'];

export const useLoginOlxPageQuery = () => {
  return useQuery({
    queryKey: key,
    queryFn: getOlxAuthLink,
    retry: 0,
    staleTime: 5 * 60 * 1000,
  });
};
