import { BodyType, clearApiInstance, createInstance } from './api-instance';

export interface SignInBodyDto {
  login: string;
  password: string;
}

export interface IMeInfo {
  id: number;
  login: string;
}

export interface ISignInResponse {
  status: boolean;
  access_token: string;
}

export interface ISaveToken {
  id: number;
  olxToken: string;
  olxRefreshToken: string;
  expires_in: string;
  adminId: number;
}

export interface ISaveTokenDTO {
  access_token: string;
  expires_in: number;
  refresh_token: string;
}

type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never;

//auth

export const authControllerSignIn = async (
  signInBodyDto: BodyType<SignInBodyDto>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ISignInResponse>(
    {
      url: `/auth/login`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: signInBodyDto,
    },
    options,
  );
};

export const authControllerMe = async (options?: SecondParameter<typeof createInstance>) => {
  return createInstance<IMeInfo>(
    {
      url: `/auth/me`,
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    },
    options,
  );
};

export const saveToken = async (
  saveTokenDTO: BodyType<ISaveTokenDTO>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ISaveTokenDTO>(
    {
      url: '/olx/callback',
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      data: saveTokenDTO,
    },
    options,
  );
};

export const exchangeOlxCode = async (code: string) => {
  const { data } = await clearApiInstance.post<{
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token: string;
  }>(
    'https://www.olx.ua/api/open/oauth/token',
    {
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_CALLBACK,
    },
    {
      headers: {
        Origin: 'http://3.126.152.164',
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
      },
    },
  );

  return data;
};

export type AuthControllerSignInResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignIn>>
>;

export type saveToken = NonNullable<Awaited<ReturnType<typeof saveToken>>>;

export type authControllerMe = NonNullable<Awaited<ReturnType<typeof authControllerMe>>>;
