import { exchangeCodeForToken } from '@/src/shared/api/api';
import { useQuery } from '@tanstack/react-query';

const key = ['olxCallback'];

export const useOlxCallback = (code: string) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const data = exchangeCodeForToken({ code: code });
      return data;
    },
    retry: 0,
  });
};
