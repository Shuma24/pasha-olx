import { UiHeader, UiPagesLayout } from '../shared/ui';
import { HeaderProfile } from '../widgets';
import { AsideWidgets } from '../widgets/aside-widgets/aside-widgets';

export const Profile = () => {
  return (
    <UiPagesLayout
      header={<UiHeader right={<HeaderProfile />} />}
      asside={<AsideWidgets />}
      content={<h1>test</h1>}
    />
  );
};
