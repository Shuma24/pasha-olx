import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { refreshOlxToken } from './api';

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

apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.config || !error.response) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    // Перевіряємо, чи URL запиту містить '/olx/'
    if (
      error.response.status === 401 &&
      originalRequest.url.includes('/olx/') &&
      originalRequest.url.includes('/cross/') &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await refreshOlxToken();

        return apiInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
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
