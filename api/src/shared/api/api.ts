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

export interface ICreateAdvertDto {
  images: File[];
  title: string;
  description: string;
  advertiserType: 'private' | 'business';
  price: string;
  size: string;
  type: string;
  quantity: string;
  year: string;
  state: string;
  brand: string;
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

interface IOlxAdvertsResponse {
  data: IAdvert[];
}

interface IAdvert {
  id: number;
  status: string;
  url: string;
  created_at: string;
  activated_at: string;
  valid_to: string;
  title: string;
  description: string;
  category_id: number;
  advertiser_type: string;
  external_id: number;
  external_url: string;
  contact: IContactInfo;
  images: Image[];
  price: IPriceDetails;
  salary?: any; // Replace with a more specific type if applicable
  attributes: IAttribute[];
  courier?: any; // Replace with a more specific type if applicable
}

interface IContactInfo {
  name: string;
  phone: number;
  location: ILocation;
}

interface ILocation {
  city_id: number;
  district_id?: number | null;
  latitude: number;
  longitude: number;
}

interface Image {
  url: string;
}

interface IPriceDetails {
  value: number;
  currency: string;
  negotiable: boolean;
  trade: boolean;
  budget: boolean;
}

interface IAttribute {
  code: string;
  value: string | number;
  values?: any | null;
}

interface ICreateAdvertResponse {
  olxUrl: string;
  botId: number;
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

export const createCrossAdvert = async (
  advertBody: BodyType<FormData>,
  options?: SecondParameter<typeof createInstance>,
) => {
  console.log(advertBody);
  return createInstance<ICreateAdvertResponse>(
    {
      url: `/cross/create`,
      method: 'post',

      data: advertBody,
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

export const getAdverts = async (
  params: { page: number; limit: number },
  options?: SecondParameter<typeof createInstance>,
) => {
  return createInstance<IOlxAdvertsResponse>(
    {
      url: `/olx/adverts`,
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
      params: params,
    },
    options,
  );
};

export type getAdverts = NonNullable<Awaited<ReturnType<typeof getAdverts>>>;
export type AuthControllerSignInResult = NonNullable<
  Awaited<ReturnType<typeof authControllerSignIn>>
>;

export type saveToken = NonNullable<Awaited<ReturnType<typeof TokenExchange>>>;
export type getOlxCredentials = NonNullable<Awaited<ReturnType<typeof getOlxCredentials>>>;
export type authControllerMe = NonNullable<Awaited<ReturnType<typeof authControllerMe>>>;
