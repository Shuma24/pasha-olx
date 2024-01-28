import { useQuery, useQueryClient } from '@tanstack/react-query';
import { authControllerMe } from '@/src/shared/api';

const key = ['me'];

export const useMeQuery = () => {
  return useQuery({
    queryKey: key,
    queryFn: authControllerMe,
    retry: 0,
    staleTime: 5 * 60 * 1000,
  });
};

export const useResetMe = () => {
  const queryClient = useQueryClient();
  return () => queryClient.refetchQueries();
};
