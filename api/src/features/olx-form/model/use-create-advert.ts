import { useForm } from 'react-hook-form';

export function useSignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    images: File[];
    title: string;
    description: string;
    advertiserType: 'private' | 'business';
    price: string;
    size: string;
    type: string;
    quantity: string;
    year: string;
    state: string;
    brand: string;
  }>({ shouldUseNativeValidation: true });

  /*   const signInMutation = useMutation({
    mutationFn: authControllerSignIn,
    onSuccess(data: { status: boolean; access_token: string }) {
      setAccessTokenToStorage(data.access_token);
      router.push(ROUTER_PATHS.HOME);
    },
  }); */

  //const errorMessage = signInMutation.error ? 'Create advert error' : undefined;

  return {
    register,
    handleSubmit: handleSubmit((data) => console.log(data)),
    errors,
  };
}
