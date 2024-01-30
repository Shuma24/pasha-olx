import React from 'react';
import { Slider, UiPageSpinner } from '@/src/shared/ui';
import { useOlxProducts } from '@/src/entities/olx/queries';
import Image from 'next/image';

export const ProductsOlx = () => {
  const { error, data, isLoading, isError } = useOlxProducts(0, 10);

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
        <div className='flex flex-col items-center'>
          {data.data.map((el) => (
            <div key={el.id} className='space-y-2'>
              {el.images.length > 0 && (
                <Image
                  unoptimized
                  src={el.images[0].url}
                  alt='Advert photo'
                  width={200}
                  height={200}
                />
              )}

              <div className='flex flex-col'>
                <h1>
                  Назва: <strong>{el.title}</strong>
                </h1>
                <span>
                  ID: <strong>{el.id}</strong>
                </span>
                <span>
                  Дата створення: <strong>{el.created_at}</strong>
                </span>
                <span>
                  Статус: <strong>{el.status}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
