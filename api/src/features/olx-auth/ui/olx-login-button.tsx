import { UiButton } from '@/src/shared/ui';
import React from 'react';
import { useOlxAuthLink } from '../model/use-olx-link';
import Link from 'next/link';

export const OlxLoginButton = () => {
  const { handle } = useOlxAuthLink();

  return (
    <UiButton variant='secondary' onClick={handle}>
      Olx Login
    </UiButton>
  );
};
