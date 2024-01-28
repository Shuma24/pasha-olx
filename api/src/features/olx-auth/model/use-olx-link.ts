export function useOlxAuthLink() {
  const olxUrl = new URL('https://www.olx.ua/oauth/authorize');
  olxUrl.searchParams.append('client_id', process.env.NEXT_PUBLIC_CLIENT_ID as string);
  //olxUrl.searchParams.append('redirect_uri', process.env.NEXT_PUBLIC_CALLBACK as string);
  olxUrl.searchParams.append('response_type', 'code');

  return {
    url: olxUrl,
  };
}
