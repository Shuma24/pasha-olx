import React from 'react';
import { Pagination, UiButton, UiPageSpinner, UiTextInputField } from '@/src/shared/ui';

import Image from 'next/image';
import { useTiresProducts } from '@/src/entities/tire';
import { debounce } from '@/src/shared/helpers';
import { useDeleteTire } from '../model/use-delete-tires';

export const ProductsOlx = () => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const { error, data, isLoading, isError } = useTiresProducts(10, currentPage, searchTerm);
  const { handleSubmit, deleteErr, pending } = useDeleteTire();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearchTerm(event.target.value), 3000)();
  };

  if (isLoading) {
    return <UiPageSpinner />;
  }

  if (isError || error) {
    if (isError) {
      return <div>Error loading products: {error.message}</div>;
    }
  }

  return (
    <>
      <div className='flex items-center justify-center'>
        <UiTextInputField
          className='w-3/12'
          inputProps={{
            type: 'search',
            placeholder: 'Search',
            onChange: handleSearchInputChange,
          }}
        />
      </div>
      {data && (
        <>
          <div className='grid grid-cols-5 md:grid-cols-3 gap-4 mt-20 p-5'>
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

                  <div className='flex flex-col text-sm'>
                    <h1 className=''>
                      Назва: <strong>{el.tires.name}</strong>
                    </h1>
                    <div className='flex flex-col'>
                      <span>
                        ID BOT: <strong>{el.id}</strong>
                      </span>
                      <span>
                        ID OLX: <strong>{el.olxId}</strong>
                      </span>
                    </div>

                    <span>
                      Дата створення: <strong>{el.tires.createdAt}</strong>
                    </span>
                  </div>
                  <UiButton
                    variant='secondary'
                    onClick={() => handleSubmit(el.tiresId)}
                    disabled={pending}>
                    Delete
                  </UiButton>
                  {deleteErr && <span className='mt-2 text-red-600'>{deleteErr.message}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className='flex mt-4 justify-center items-center gap-4'>
            <Pagination
              currentPage={currentPage}
              pageCount={data.total}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
};
