import { UiHeader, UiPagesLayout } from '../shared/ui';
import { HeaderProfile, OlxFrom } from '../widgets';
import { AsideWidgets } from '../widgets/aside-widgets/aside-widgets';

export const HomePage = () => {
  return (
    <UiPagesLayout
      header={<UiHeader right={<HeaderProfile />} />}
      asside={<AsideWidgets />}
      content={<OlxFrom />}
    />
  );
};
