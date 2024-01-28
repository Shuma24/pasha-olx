export const createOlxLoginLink = (clientId: string, callbackUrl: string): string => {
  const olxUrl = new URL('https://www.olx.ua/oauth/authorize');
  olxUrl.searchParams.append('client_id', clientId);
  olxUrl.searchParams.append('redirect_uri', callbackUrl);
  olxUrl.searchParams.append('response_type', 'code');

  return olxUrl.toString();
};

export const createTokenUrl = () => {
  const olxTokenUrl = new URL('https://www.olx.ua/api/open/oauth/token');

  return olxTokenUrl.toString();
};
