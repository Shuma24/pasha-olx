import { authControllerSignIn } from '@/src/shared/api';
import { ROUTER_PATHS } from '@/src/shared/constants';
import { setAccessTokenToStorage } from '@/src/shared/helpers/localstorage/localstorage';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export function useSignInForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<{
    login: string;
    password: string;
  }>();

  const signInMutation = useMutation({
    mutationFn: authControllerSignIn,
    onSuccess(data: { status: boolean; access_token: string }) {
      setAccessTokenToStorage(data.access_token);
      router.push(ROUTER_PATHS.HOME);
    },
  });

  const errorMessage = signInMutation.error ? 'Sign in failed' : undefined;

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit((data) => signInMutation.mutate(data)),
    isLoading: signInMutation.isPending,
  };
}
