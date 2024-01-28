import { useMeQuery } from '@/src/entities/admin';
import { ROUTER_PATHS } from '@/src/shared/constants';
import { UiPageSpinner } from '@/src/shared/ui';
import { useRouter } from 'next/router';
import { PropsWithChildren, ReactElement } from 'react';

export function protectedPage<P>(Component: (props: P) => ReactElement) {
  return function ProtectedPage(props: PropsWithChildren<P>) {
    const router = useRouter();

    const { isError, isLoading } = useMeQuery();

    if (isLoading) {
      return <UiPageSpinner />;
    }

    if (isError) {
      router.replace(ROUTER_PATHS.SIGN_IN);
    }

    return <Component {...props} />;
  };
}
