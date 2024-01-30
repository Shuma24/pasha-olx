import React from 'react';
import { UiHeader, UiPagesLayout } from '../shared/ui';
import { HeaderProfile } from '../widgets';
import { AsideWidgets } from '../widgets/aside-widgets/aside-widgets';
import { ProductsWidget } from '../widgets/products/products-widget';

export const Products = () => {
  return (
    <UiPagesLayout
      header={<UiHeader right={<HeaderProfile />} />}
      asside={<AsideWidgets />}
      content={<ProductsWidget />}
    />
  );
};
