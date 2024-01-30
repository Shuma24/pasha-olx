import React from 'react';
import { UseOLxProducts } from '../model/use-olx-products';
import { UiPageSpinner } from '@/src/shared/ui';

export const ProductsOlx = () => {
  const { error, fetchProducts, productsMutation } = UseOLxProducts();

  const fetchWrap = React.useCallback(() => fetchProducts(), [fetchProducts]);

  React.useEffect(() => {
    fetchWrap();
  }, [fetchWrap]);

  if (productsMutation.isPending) {
    return <UiPageSpinner />;
  }

  if (productsMutation.isError || error) {
    if (productsMutation.isError) {
      return (
        <div>
          Error loading products: {productsMutation.error.message} || {error}
        </div>
      );
    }
  }

  if (productsMutation.data && productsMutation.data.data.length) {
    return <div>No products to display</div>;
  }

  if (productsMutation.data && productsMutation.data.data) {
    return (
      <div className='grid grid-cols-5 md:grid-cols-3 gap-4'>
        {productsMutation.data.data.map((el) => (
          <div key={el.id}>
            <span>{el.title}</span>
            <span>{el.url}</span>
          </div>
        ))}
      </div>
    );
  }
};
