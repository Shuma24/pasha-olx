import { ROUTER_PATHS } from '@/src/shared/constants';
import { UiPageSpinner } from '@/src/shared/ui';
import router from 'next/router';
import { useSaveToken } from '../model/use-olx-token';

export const Callback = () => {
  const { isError, isLoading, handleExchange, error } = useSaveToken();

  if (isError && error) {
    console.log('Error callback olx');
    console.log(error.message);
    router.push(ROUTER_PATHS.HOME);
  }

  if (isLoading) {
    return <UiPageSpinner />;
  }

  handleExchange();
  console.log('Callback success');

  router.push(ROUTER_PATHS.HOME);
};
