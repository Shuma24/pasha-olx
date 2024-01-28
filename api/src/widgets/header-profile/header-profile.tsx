import { useMeQuery } from '@/src/entities/admin';
import { SignOutButton } from '@/src/features/auth';
import { ROUTER_PATHS } from '@/src/shared/constants';
import { UiLink } from '@/src/shared/ui';

export function HeaderProfile() {
  const { data: admin } = useMeQuery();

  if (!admin) return null;

  return (
    <div className='flex gap-2 items-center'>
      <UiLink href={ROUTER_PATHS.PROFILE} className='hover:underline underline-offset-8 text-black'>
        {admin.login.toUpperCase()}
      </UiLink>
      <SignOutButton />
    </div>
  );
}
