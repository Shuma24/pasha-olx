import { deleteTires } from '@/src/shared/api/api';
import { ROUTER_PATHS } from '@/src/shared/constants';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export function useDeleteTire() {
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: deleteTires,
    onSuccess() {
      router.reload();
    },
  });

  const del = (id: number) => deleteMutation.mutate({ id: id });

  return {
    handleSubmit: del,
    deleteErr: deleteMutation.error,
    pending: deleteMutation.isPending,
  };
}
