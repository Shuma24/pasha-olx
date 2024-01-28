import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const clearApiInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': 'http://3.126.152.164',
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    Connection: 'keep-alive',
    'Content-Type': 'application/json',
  },
});

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.request.use(
  async (config) => {
    let access_token = localStorage.getItem('access_token');
    if (access_token) {
      access_token = JSON.parse(access_token);
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  },
  (error) => {
    return error;
  },
);

export const createInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return apiInstance({
    ...config,
    ...options,
  }).then((r) => r.data);
};

export type BodyType<Data> = Data;

export type ErrorType<Error> = AxiosError<Error>;
