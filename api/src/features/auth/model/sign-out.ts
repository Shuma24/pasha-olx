import { useResetMe } from '@/src/entities/admin/queries';
import { ROUTER_PATHS } from '@/src/shared/constants';
import { deleteAccessTokenFromStorage } from '@/src/shared/helpers';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export function useSignOut() {
  const router = useRouter();
  const resetCredentials = useResetMe();

  const signOutMutation = useMutation({
    mutationFn: deleteAccessTokenFromStorage,
    async onSuccess() {
      router.push(ROUTER_PATHS.SIGN_IN);
      resetCredentials();
    },
  });

  return {
    isLoading: signOutMutation.isPending,
    singOut: signOutMutation.mutate,
  };
}
