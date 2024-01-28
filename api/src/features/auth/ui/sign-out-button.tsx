import { UiButton } from '@/src/shared/ui';
import { useSignOut } from '../model/sign-out';

export function SignOutButton() {
  const { singOut, isLoading } = useSignOut();

  return (
    <UiButton variant='outlined' disabled={isLoading} onClick={() => singOut()}>
      Sign Out
    </UiButton>
  );
}
