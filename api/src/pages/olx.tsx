import { OlxLoginButton } from '../features/olx-auth';
import { UiHeader, UiPagesLayout } from '../shared/ui';
import { HeaderProfile } from '../widgets';
import { AsideWidgets } from '../widgets/aside-widgets/aside-widgets';

export const OlxPage = () => {
  return (
    <UiPagesLayout
      header={<UiHeader right={<HeaderProfile />} />}
      asside={<AsideWidgets />}
      content={<OlxLoginButton />}
    />
  );
};
