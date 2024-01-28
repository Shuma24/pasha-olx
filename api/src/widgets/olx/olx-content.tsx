import { OlxLoginButton, OlxStatus } from '@/src/features/olx-auth';
import React from 'react';

export const OlxContent = () => {
  return (
    <div className='container m-auto flex gap-10 flex-col items-center flex-wrap'>
      <OlxLoginButton />
      <OlxStatus />
    </div>
  );
};
