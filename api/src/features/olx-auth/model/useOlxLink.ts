export function useOlxAuthLink() {
  const olxUrl = new URL('https://www.olx.ua/oauth/authorize');
  olxUrl.searchParams.append('client_id', process.env.CLIENT_ID as string);
  olxUrl.searchParams.append('redirect_uri', process.env.CLIENT_SECRET as string);
  olxUrl.searchParams.append('response_type', 'code');

  const handleClick = () => {
    window.location.href = olxUrl.toString();
  };

  return {
    handleClick: handleClick,
  };
}
