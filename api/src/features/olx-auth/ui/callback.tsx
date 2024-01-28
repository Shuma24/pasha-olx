import { ROUTER_PATHS } from '@/src/shared/constants';
import { UiPageSpinner } from '@/src/shared/ui';
import router, { useRouter } from 'next/router';
import { useSaveToken } from '../model/use-olx-token';
import { useEffect, useState } from 'react';

export const Callback = () => {
  const [test, setTest] = useState('');

  const router = useRouter();
  const { code } = router.query;
  const codeString = typeof code === 'string' ? code : '';

  useEffect(() => {
    const response = fetch('http://3.126.152.164:8888/olx/callback', {
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(code),
    });

    response
      .then(async (data) => {
        const items = await data.json();
        console.log(items);
        setTest(items);
      })
      .catch((e) => console.log(e));
  }, [codeString]);

  console.log('Callback success');
  console.log(test);

  router.push(ROUTER_PATHS.HOME);
  return <div className=''></div>;
};
