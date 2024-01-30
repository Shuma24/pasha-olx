import React from 'react';
import { UiPageSpinner } from '@/src/shared/ui';
import { useOlxProducts } from '@/src/entities/olx/queries';

export const ProductsOlx = () => {
  const { error, data, isLoading, isError } = useOlxProducts();

  if (isLoading) {
    return <UiPageSpinner />;
  }

  if (isError || error) {
    if (isError) {
      return <div>Error loading products: {error.message}</div>;
    }
  }

  if (data && !data.data.length) {
    return <div>No products to display</div>;
  }

  if (data && data.data) {
    return (
      <div className='grid grid-cols-5 md:grid-cols-3 gap-4'>
        {data.data.map((el) => (
          <div key={el.id}>
            <span>{el.title}</span>
            <span>{el.url}</span>
          </div>
        ))}
      </div>
    );
  }
};
