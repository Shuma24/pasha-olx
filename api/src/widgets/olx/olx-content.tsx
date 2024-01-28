import { OlxLoginButton, OlxStatus } from '@/src/features/olx-auth';
import React from 'react';

export const OlxContent = () => {
  return (
    <div className='container m-auto flex gap-20 items-center'>
      <OlxLoginButton />
      <OlxStatus />
    </div>
  );
};
