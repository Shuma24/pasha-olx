import { useQuery } from '@tanstack/react-query';

const key = ['olxCallback'];

export const useOlxCallback = (access_token: string, expires_in: number, refresh_token: string) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {},
    retry: 0,
  });
};
