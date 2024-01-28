import { ROUTER_PATHS } from '@/src/shared/constants';
import { UiLink } from '@/src/shared/ui';
import React from 'react';

const links = [
  { id: 1, href: ROUTER_PATHS.HOME, label: 'HOME' },
  { id: 2, href: ROUTER_PATHS.PROFILE, label: 'Profile' },
  { id: 3, href: ROUTER_PATHS.OLX, label: 'Olx' },
];

export const AsideWidgets = () => {
  return (
    <aside className='px-5 pt-10'>
      {links.map((el) => (
        <UiLink href={el.href} key={el.id}>
          {el.label}
        </UiLink>
      ))}
    </aside>
  );
};
