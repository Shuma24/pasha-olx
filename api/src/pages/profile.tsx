import { useEffect, useState } from 'react';
import { useLoginOlxPageQuery } from '../entities/olx';
import { apiInstance } from '../shared/api/api-instance';
import { UiButton, UiHeader } from '../shared/ui';
import { HeaderProfile } from '../widgets';

export const Profile = () => {
  const [link, setLink] = useState('');

  useEffect(() => {
    apiInstance.get<{ status: boolean; url: string }>('olx/login').then((data) => {
      setLink(data.data.url);
    });
  }, []);

  const handleButtonClick = () => {
    window.location.href = link;
  };

  return (
    <div className='min-h-screen flex flex-col bg-slate-100'>
      <UiHeader right={<HeaderProfile />} />
      <UiButton variant='primary' onClick={handleButtonClick}>
        test
      </UiButton>
    </div>
  );
};
