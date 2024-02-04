import { AxiosError } from 'axios';
import type { IClientService } from '../common/client-service/client.service';
import type { IConfigService } from '../common/config-service/config.service';
import type { ILoggerService } from '../common/logger-service/logger.service';
import type { IOlxCredentialsEntity } from './entity/olx.credentials.entity';
import { bodyMaker } from './helpers/body-maker';
import type {
  IFinishedAdvertOlxResponse,
  IListOlxAdvertsResponse,
  IOlxTokenResponse,
} from './interfaces';
import type { IOlxRepository } from './repository/olx.repository';

interface IOlxAvertData {
  files: { url: string }[];
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

export interface IOlxService {
  callbackOlx(code: string, adminId: number): Promise<IOlxCredentialsEntity | undefined>;
  getCredentialsOlx(adminId: number): Promise<IOlxCredentialsEntity | null>;
  createAdvert(data: IOlxAvertData, adminId: number): Promise<number>;
  listOfAdverts(
    adminId: number,
    page: number,
    limit: number,
  ): Promise<IListOlxAdvertsResponse | never[]>;
  refresh(adminId: number): Promise<IOlxCredentialsEntity>;
  delete(id: number, adminId: number): Promise<boolean>;
}

export class OlxService implements IOlxService {
  constructor(
    private readonly _configService: IConfigService,
    private readonly _clientService: IClientService,
    private readonly _olxRepository: IOlxRepository,
    private readonly _loggerService: ILoggerService,
  ) {
    this._loggerService.info('OlxService initialized');
  }

  async getCredentialsOlx(adminId: number) {
    return await this._olxRepository.get({ adminId: Number(adminId) });
  }

  async listOfAdverts(adminId: number, page: number, limit: number) {
    const cred = await this.getCredentialsOlx(adminId);
    if (!cred) throw new Error('Set olx credentials');

    try {
      const { data } = await this._clientService.GET<IListOlxAdvertsResponse>(
        'https://www.olx.ua/api/partner/adverts',
        {
          headers: {
            Version: 'v2',
            Authorization: `Bearer ${cred.olxToken}`,
          },
          params: {
            offset: page,
            limit: limit,
          },
        },
      );

      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        const statusText = error.response?.statusText;

        const errorMessage = `Error fetching OLX adverts: ${statusCode} ${statusText}`;

        this._loggerService.error(errorMessage);

        switch (statusCode) {
          case 401:
            throw new Error(`${errorMessage} - Unauthorized access. Please check credentials.`);
          case 403:
            throw new Error(`${errorMessage} - Forbidden access. Please check permissions.`);
          default:
            throw new Error(errorMessage);
        }
      } else {
        this._loggerService.error(error);
        throw new Error(`An unexpected error occurred: ${error.message}`);
      }
    }
  }

  async callbackOlx(code: string, adminId: number): Promise<IOlxCredentialsEntity | undefined> {
    try {
      const clientId = this._configService.get('OLX_CLIENT_ID');
      const redirectUrl = this._configService.get('OLX_REDIRECT_URL');
      const clientSecret = this._configService.get('OLX_CLIENT_SECRET');

      const { data } = await this._clientService.POST<IOlxTokenResponse>(
        'https://www.olx.ua/api/open/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          scope: 'v2 read write',
          redirect_uri: redirectUrl,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      if (!data) throw new Error('Problems with olx /auth/token');

      const olxCred = await this._olxRepository.get({ adminId: adminId });

      if (!olxCred)
        throw new Error('Cant set access_token olx to db because olx credentials is required.');

      const credentials = await this._olxRepository.update(
        {
          adminId: olxCred.adminId,
          olxRefreshToken: data.refresh_token,
          olxToken: data.access_token,
          expires_in: data.expires_in.toString(),
        },
        olxCred.id,
      );

      if (!credentials) return undefined;

      return credentials;
    } catch (error) {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        const statusText = error.response?.statusText;

        const errorMessage = `Error fetching OLX adverts: ${statusCode} ${statusText}`;
        this._loggerService.error(errorMessage);
        throw new Error(errorMessage);
      } else {
        this._loggerService.error(error);
        throw new Error(`An unexpected error occurred: ${error.message}`);
      }
    }
  }

  async createAdvert(data: IOlxAvertData, adminId: number) {
    const cred = await this.getCredentialsOlx(adminId);
    if (!cred) throw new Error('Set olx credentials');

    const body = bodyMaker({
      title: data.title,
      description: data.description,
      advertiser_type: data.advertiserType,
      images: data.files,
      price: Number(data.price),
      state: data.state,
      type: data.type,
      size: data.size,
      year: data.year,
      quantity: Number(data.quantity),
      brand: data.brand,
    });

    try {
      const response = await this._clientService.POST<IFinishedAdvertOlxResponse>(
        'https://www.olx.ua/api/partner/adverts',
        body,
        {
          headers: {
            Version: 'v2',
            Authorization: `Bearer ${cred.olxToken}`,
          },
        },
      );

      return response.data.data.id;
    } catch (error) {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        const statusText = error.response?.statusText;

        const errorMessage = `Error fetching OLX adverts: ${statusCode} ${statusText}`;
        this._loggerService.error(errorMessage);

        switch (statusCode) {
          case 401:
            throw new Error(`${errorMessage} - Unauthorized access. Please check credentials.`);
          case 403:
            throw new Error(`${errorMessage} - Forbidden access. Please check permissions.`);
          default:
            throw new Error(errorMessage);
        }
      } else {
        this._loggerService.error(error);
        throw new Error(`An unexpected error occurred: ${error.message}`);
      }
    }
  }

  async refresh(adminId: number) {
    const clientId = this._configService.get('OLX_CLIENT_ID');
    const clientSecret = this._configService.get('OLX_CLIENT_SECRET');

    try {
      const olxCred = await this._olxRepository.get({ adminId: adminId });

      if (!olxCred) throw new Error('No olx credential in db');

      const { data } = await this._clientService.POST<IOlxTokenResponse>(
        'https://www.olx.ua/api/open/oauth/token',
        {
          grant_type: 'refresh_token',
          client_id: clientId,
          client_secret: clientSecret,
          refresh_token: olxCred.olxRefreshToken,
        },
      );

      const newCred = await this._olxRepository.update(
        {
          olxToken: data.access_token,
          olxRefreshToken: data.refresh_token,
          expires_in: data.expires_in.toString(),
          adminId: olxCred.adminId,
        },
        olxCred.id,
      );

      if (!newCred) throw new Error('Error set refreshed olx cred to db');

      return newCred;
    } catch (error) {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        const statusText = error.response?.statusText;

        const errorMessage = `Error fetching OLX adverts: ${statusCode} ${statusText}`;
        this._loggerService.error(errorMessage);

        throw new Error(errorMessage);
      } else {
        this._loggerService.error(error);
        throw new Error(`An unexpected error occurred: ${error.message}`);
      }
    }
  }

  async delete(id: number, adminId: number) {
    try {
      const olxCred = await this._olxRepository.get({ adminId: adminId });

      if (!olxCred) throw new Error('No olx credential in db');

      const response = await this._clientService.DELETE(
        `https://www.olx.ua/api/partner/adverts/${id}`,
        {
          headers: {
            Version: 'v2',
            Authorization: `Bearer ${olxCred.olxToken}`,
          },
        },
      );

      if (response.status === 204) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status;
        const statusText = error.response?.statusText;

        const errorMessage = `Error fetching OLX adverts: ${statusCode} ${statusText}`;
        this._loggerService.error(errorMessage);

        throw new Error(errorMessage);
      } else {
        this._loggerService.error(error);
        throw new Error(`An unexpected error occurred: ${error.message}`);
      }
    }
  }
}
