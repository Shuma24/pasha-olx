import { TokenExchange } from '@/src/shared/api/api';
import { useQuery } from '@tanstack/react-query';

const key = ['olxExchange'];

export const useOlxExchange = (code: string) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const data = await TokenExchange({ code: code });
      return data;
    },
    retry: 0,
  });
};
