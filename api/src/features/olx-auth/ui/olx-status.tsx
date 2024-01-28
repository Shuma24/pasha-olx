import { useOlxCredentials } from '@/src/entities/olx/queries';
import { UiPageSpinner } from '@/src/shared/ui';
import React from 'react';

export const OlxStatus = () => {
  const { data, isLoading, isError } = useOlxCredentials();

  if (isLoading) return <UiPageSpinner />;

  const isData = data && (
    <div className='flex items-center'>
      <span>{data.olxToken}</span>
      <span>{data.expires_in}</span>
    </div>
  );

  const isBadReq = isError && <div className=''>Error fetch olx credentials</div>;

  return <div className=''>{isData || isBadReq}</div>;
};
