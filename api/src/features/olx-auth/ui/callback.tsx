import { useOlxCallback } from '@/src/entities/olx';
import { ROUTER_PATHS } from '@/src/shared/constants';
import { UiPageSpinner } from '@/src/shared/ui';
import { useRouter } from 'next/router';

export const Callback = () => {
  const router = useRouter();

  const { code } = router.query;

  const codeString = typeof code === 'string' ? code : '';

  const { data, isLoading, isError, error } = useOlxCallback(codeString);

  if (isLoading) {
    return <UiPageSpinner />;
  }

  if (isError) {
    console.log('Error callback olx');
    console.log(error.message);
    router.push(ROUTER_PATHS.HOME);
  }

  if (data) {
    console.log('Callback success');
    router.push(ROUTER_PATHS.HOME);
  }
};
