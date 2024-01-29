import { useOlxCredentials } from '@/src/entities/olx/queries';
import { useMutation } from '@tanstack/react-query';

export const UseOLxProducts = () => {
  const { data, error } = useOlxCredentials();

  if (!data) {
    return {
      error: error,
    };
  }
};
