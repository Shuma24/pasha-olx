import React from 'react';
import { UiButton, UiPageSpinner } from '@/src/shared/ui';

import Image from 'next/image';
import { useTiresProducts } from '@/src/entities/tire';

export const ProductsOlx = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const { error, data, isLoading, isError } = useTiresProducts(currentPage, 10);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (isLoading) {
    return <UiPageSpinner />;
  }

  if (isError || error) {
    if (isError) {
      return <div>Error loading products: {error.message}</div>;
    }
  }

  if (data) {
    return (
      <>
        <div className='grid grid-cols-5 md:grid-cols-3 gap-4'>
          <div className='flex flex-col items-center'>
            {data.tires.map((el) => (
              <div key={el.id} className='space-y-2'>
                {el.tires.images.length > 0 && (
                  <Image
                    unoptimized
                    src={el.tires.images[0].url}
                    alt='Tire photo'
                    width={200}
                    height={200}
                  />
                )}

                <div className='flex flex-col'>
                  <h1>
                    Назва: <strong>{el.tires.name}</strong>
                  </h1>
                  <span>
                    ID BOT: <strong>{el.id}</strong>
                    ID OLX: <strong>{el.olxId}</strong>
                  </span>
                  <span>
                    Дата створення: <strong>{el.tires.createdAt}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex mt-4 justify-center items-center gap-4'></div>
      </>
    );
  }
};
