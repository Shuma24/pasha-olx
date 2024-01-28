import { ROUTER_PATHS } from '@/src/shared/constants';
import { UiLink } from '@/src/shared/ui';
import React from 'react';

const links = [
  { id: 1, href: ROUTER_PATHS.HOME, label: 'HOME' },
  { id: 2, href: ROUTER_PATHS.PROFILE, label: 'PROFILE' },
  { id: 3, href: ROUTER_PATHS.OLX, label: 'OLX' },
  { id: 4, href: ROUTER_PATHS.PRODUCTS, label: 'PRODUCTS' },
];

export const AsideWidgets = () => {
  return (
    <aside className='bg-gray-100 p-4 rounded-lg shadow-md'>
      <div className='flex gap-2 items-center justify-center flex-row'>
        {links.map((el) => (
          <UiLink
            href={el.href}
            key={el.id}
            className='text-black p-0 hover:text-blue-700 hover:underline transition duration-300'>
            {el.label}
          </UiLink>
        ))}
      </div>
    </aside>
  );
};
