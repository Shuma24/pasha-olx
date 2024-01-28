import { BodyType, createInstance } from './api-instance';

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

export interface ITokenExchangeDTO {
  code: string;
}

export interface ITokenExchangeResponse {
  cred: {
    id: number;
    olxToken: string;
    olxRefreshToken: string;
    expires_in: string;
    adminId: number;
  };
  status: boolean;
}

export interface IOlxCredentialsResponse {
  id: number;
  olxToken: string;
  olxRefreshToken: string;
  expires_in: string;
  adminId: number;
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

export const TokenExchange = async (
  saveTokenDTO: BodyType<ITokenExchangeDTO>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<ITokenExchangeResponse>(
    {
      url: '/olx/callback',
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      data: saveTokenDTO,
    },
    options,
  );
};

export const getOlxCredentials = async (options?: SecondParameter<typeof createInstance>) => {
  return createInstance<IOlxCredentialsResponse>(
    {
      url: '/olx/get',
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    },
    options,
  );
};

export type AuthControllerSignInResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignIn>>
>;

export type saveToken = NonNullable<Awaited<ReturnType<typeof TokenExchange>>>;
export type getOlxCredentials = NonNullable<Awaited<ReturnType<typeof getOlxCredentials>>>;
export type authControllerMe = NonNullable<Awaited<ReturnType<typeof authControllerMe>>>;
