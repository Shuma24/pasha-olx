import React from 'react';
import ReactPaginate from 'react-paginate';

export const Pagination = ({
  pageCount,
  onPageChange,
  currentPage,
}: {
  pageCount: number;
  onPageChange: Function;
  currentPage: number;
}) => {
  return (
    <>
      <ReactPaginate
        className='flex'
        breakLabel='...'
        nextLabel=''
        pageClassName='inline-block'
        pageLinkClassName='text-fe5f1e bg-white border border-fe5f1e rounded-full w-10 h-10 flex items-center justify-center mx-1 cursor-pointer'
        breakClassName='text-fe5f1e'
        previousClassName='text-fe5f1e'
        nextClassName='text-fe5f1e'
        onPageChange={(e) => onPageChange(e)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel=''
        renderOnZeroPageCount={null!}
        forcePage={Math.min(Math.max(currentPage, 0), pageCount - 1)}
      />
    </>
  );
};
