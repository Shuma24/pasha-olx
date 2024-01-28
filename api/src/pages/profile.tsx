import { UiHeader, UiPagesLayout } from '../shared/ui';
import { HeaderProfile } from '../widgets';
import { AsideWidgets } from '../widgets/aside-widgets/aside-widgets';
import { ProfileWidget } from '../widgets/profile/profile';

export const Profile = () => {
  return (
    <UiPagesLayout
      header={<UiHeader right={<HeaderProfile />} />}
      asside={<AsideWidgets />}
      content={<ProfileWidget />}
    />
  );
};
