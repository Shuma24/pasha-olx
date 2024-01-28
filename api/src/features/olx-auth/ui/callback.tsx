import { ROUTER_PATHS } from '@/src/shared/constants';
import { UiPageSpinner } from '@/src/shared/ui';
import router, { useRouter } from 'next/router';
import { useSaveToken } from '../model/use-olx-token';
import { useEffect, useState } from 'react';
import queryString from 'querystring';

export const Callback = () => {
  const [test, setTest] = useState('');

  const router = useRouter();
  const { code } = router.query;
  const codeString = typeof code === 'string' ? code : '';

  useEffect(() => {
    const testfunc = async () => {
      const test = await fetch('https://www.olx.ua/api/open/oauth/token', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: queryString.stringify({
          grant_type: 'authorization_code',
          client_id: '201728',
          client_secret: 'IAPbihsb7LvQFes5gPqVCpbX17Q6nK6Fl27hd6uoe8NfCrzy',
          code: codeString,
          redirect_uri: 'http://3.126.152.164/olx/callback',
        }),
      });

      console.log(test);

      return await test.json();
    };
  }, [codeString]);

  console.log('Callback success');

  router.push(ROUTER_PATHS.HOME);
  return <div className=''></div>;
};
