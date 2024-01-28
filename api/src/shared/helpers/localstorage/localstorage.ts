export const deleteAccessTokenFromStorage = async () => {
  try {
    localStorage.removeItem('access_token');

    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const setAccessTokenToStorage = (access_token: string) =>
  localStorage.setItem('access_token', JSON.stringify(access_token));
