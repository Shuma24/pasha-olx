import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IClientService {
  getClient(): AxiosInstance;
  GET<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  POST<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  DELETE<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  PUT<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
}

export class ClientService implements IClientService {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create();
  }

  getClient(): AxiosInstance {
    return this.client;
  }

  async GET<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>) {
    const response = this.client.get<T, R, D>(url, config);

    return response
      .then((data) => data)
      .catch((e: AxiosError<T, D>) => {
        throw new Error(`${(e.code, e.message)}`);
      });
  }

  async POST<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) {
    const response = this.client.post<T, R, D>(url, data, config);

    return response
      .then((data) => data)
      .catch((e: AxiosError<T, D>) => {
        throw new Error(`${(e.code, e.message)}`);
      });
  }

  async PUT<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) {
    const response = this.client.put<T, R, D>(url, data, config);

    return response
      .then((data) => data)
      .catch((e: AxiosError<T, D>) => {
        throw new Error(`${(e.code, e.message)}`);
      });
  }

  async DELETE<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ) {
    const response = this.client.delete<T, R, D>(url, config);

    return response
      .then((data) => data)
      .catch((e: AxiosError<T, D>) => {
        throw new Error(`${(e.code, e.message)}`);
      });
  }
}
