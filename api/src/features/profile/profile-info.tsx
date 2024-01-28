import { useMeQuery } from '@/src/entities/admin';
import { UiPageSpinner } from '@/src/shared/ui';
import React from 'react';

export const ProfileInfo = () => {
  const { data, isLoading, isError } = useMeQuery();

  if (isLoading) return <UiPageSpinner />;

  const admin = data && (
    <>
      <span className=''>
        ID: <strong>{data.id}</strong>
      </span>
      <span className=''>
        Login: <strong>{data.login}</strong>
      </span>
    </>
  );

  const error = isError && <span>Error fetch admin</span>;

  return <div className='flex flex-col'>{admin || error}</div>;
};
