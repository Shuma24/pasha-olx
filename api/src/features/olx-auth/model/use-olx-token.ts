import { exchangeOlxCode, saveToken } from '@/src/shared/api/api';
import { clearApiInstance } from '@/src/shared/api/api-instance';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export function useSaveToken() {
  const router = useRouter();
  const { code } = router.query;
  const codeString = typeof code === 'string' ? code : '';

  console.log(code);

  const signOutMutation = useMutation({
    mutationFn: exchangeOlxCode,
    async onSuccess(data) {
      const credentials = await saveToken({
        access_token: data.access_token,
        expires_in: data.expires_in,
        refresh_token: data.refresh_token,
      });
      return credentials;
    },
  });

  return {
    isLoading: signOutMutation.isPending,
    isError: signOutMutation.isError,
    error: signOutMutation.error,
    handleExchange: () => signOutMutation.mutate(codeString),
  };
}
