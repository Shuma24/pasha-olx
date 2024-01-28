import { ROUTER_PATHS } from '@/src/shared/constants';
import { UiPageSpinner } from '@/src/shared/ui';
import { useRouter } from 'next/router';

import { useOlxExchange } from '@/src/entities/olx/queries';

export const Callback = () => {
  const router = useRouter();
  const { code } = router.query;
  const codeString = typeof code === 'string' ? code : '';

  const { isError, isLoading, data, error } = useOlxExchange(codeString);

  if (isLoading) {
    return <UiPageSpinner />;
  }

  if (isError) {
    console.log(error.message);
    router.push(ROUTER_PATHS.HOME);
  }

  if (data) {
    router.push(ROUTER_PATHS.HOME);
    console.log('Callback success');
  }

  router.push(ROUTER_PATHS.HOME);
};
