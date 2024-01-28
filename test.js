const querystring = require('querystring');

const body = {
  grant_type: 'authorization_code',
  client_id: '201728',
  client_secret: 'IAPbihsb7LvQFes5gPqVCpbX17Q6nK6Fl27hd6uoe8NfCrzy',
  code: '81a8d02cc999e64ccfcb9c2250ecda28e686b65e',
  redirect_uri: 'http://3.126.152.164/olx/callback',
};

const testfunc = async () => {
  const test = await fetch('https://www.olx.ua/api/open/oauth/token', {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify(body),
  });

  console.log(test);

  return await test.json();
};

testfunc()
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
