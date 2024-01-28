import { useOlxCredentials } from '@/src/entities/olx/queries';
import { UiPageSpinner } from '@/src/shared/ui';
import React from 'react';

export const OlxStatus = () => {
  const { data, isLoading, isError } = useOlxCredentials();

  if (isLoading) return <UiPageSpinner />;

  const isData = data && (
    <div className='flex items-center gap-10 flex-wrap flex-col'>
      <span>
        Token: <strong>{data.olxToken}</strong>
      </span>
      <span>
        Token life: <strong>{data.expires_in}</strong>, if you have error reauthorize
      </span>
    </div>
  );

  const isBadReq = isError && <div className=''>Error fetch olx credentials</div>;

  return <div className=''>{isData || isBadReq}</div>;
};
