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
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibG9naW4iOiJ0aXJlcy1hZG1pbiIsImlhdCI6MTcwNjQ1OTMzOCwiZXhwIjoxNzA3MDY0MTM4fQ.4FQNll8Mbw6H0Zuji99fuWFqeCb60599xmwwMXVtYT0',
      },
      body: JSON.stringify({
        code: codeString,
      }),
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
