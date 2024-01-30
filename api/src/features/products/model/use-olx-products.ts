import { useOlxCredentials } from '@/src/entities/olx/queries';
import { getAdverts } from '@/src/shared/api/api';
import { useMutation } from '@tanstack/react-query';

export const UseOLxProducts = () => {
  // Assuming useOlxCredentials returns an object with a token
  const { data } = useOlxCredentials();

  // We are extracting token which might be undefined
  const token = data?.olxToken;
  let error = '';

  const productsMutation = useMutation({
    mutationFn: (token: string) => {
      // Ensure that token is not undefined before calling getAdverts
      if (token) {
        return getAdverts(token);
      } else {
        throw new Error('Token is undefined');
      }
    },
  });

  const fetchProducts = () => {
    if (typeof token === 'string') {
      productsMutation.mutate(token);
    } else {
      error = 'Token is not available.';
    }
  };

  return {
    fetchProducts,
    error,
    productsMutation,
  };
};
