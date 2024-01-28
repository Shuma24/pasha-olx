import { UiButton } from '@/src/shared/ui';
import React from 'react';
import { useOlxAuthLink } from '../model/useOlxLink';

export const OlxLoginButton = () => {
  const { handleClick } = useOlxAuthLink();

  return <UiButton variant='secondary' onClick={handleClick}></UiButton>;
};
