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

export interface IExchangeCodeForToken {
  id: number;
  olxToken: string;
  olxRefreshToken: string;
  expires_in: string;
  adminId: number;
}

export interface ExchangeCodeForTokenDTO {
  code: string;
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

export const exchangeCodeForToken = async (
  ExchangeCodeForTokenDTO: BodyType<ExchangeCodeForTokenDTO>,
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<IExchangeCodeForToken>(
    {
      url: `/olx/callback`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: ExchangeCodeForTokenDTO,
    },
    options,
  );
};

export type AuthControllerSignInResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignIn>>
>;

export type exchangeCodeForToken = NonNullable<Awaited<ReturnType<typeof exchangeCodeForToken>>>;

export type authControllerMe = NonNullable<Awaited<ReturnType<typeof authControllerMe>>>;
