import clsx from 'clsx';
import Image from 'next/image';
import { UiLink } from '..';
import { ROUTER_PATHS } from '../../constants';

export const UiLogo = ({ className }: { className?: string }) => {
  return (
    <UiLink href={ROUTER_PATHS.HOME}>
      <div className={clsx(className, 'flex items-center gap-2 text-xl')}>
        <Tires className='w-20 h-20' />
        Fresh Tires
      </div>
    </UiLink>
  );
};

const Tires = ({ className }: { className?: string }) => {
  return (
    <Image className={className} width={1000} height={1000} src='/logo.png' alt='Logo'></Image>
  );
};
