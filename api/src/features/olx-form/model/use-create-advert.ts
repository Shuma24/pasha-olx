import { createCrossAdvert } from '@/src/shared/api/api';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export function useSignInForm() {
  const { register, handleSubmit } = useForm<{
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

  const createAdvertMutation = useMutation({
    mutationFn: createCrossAdvert,
  });

  const errorMessage = createAdvertMutation.error ? 'Create advert error' : undefined;

  return {
    register,
    errorMessage,
    handleSubmit: handleSubmit((data) => {
      const formData = new FormData();

      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('advertiserType', data.advertiserType);
      formData.append('price', data.price);
      formData.append('size', data.size);
      formData.append('type', data.type);
      formData.append('quantity', data.quantity);
      formData.append('year', data.year);
      formData.append('state', data.state);
      formData.append('brand', data.brand);

      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }

      return createAdvertMutation.mutate(formData);
    }),
    loading: createAdvertMutation.isPending,
    data: createAdvertMutation.data,
  };
}
