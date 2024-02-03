import type { IClientService } from '../common/client-service/client.service';
import type { IConfigService } from '../common/config-service/config.service';
import type { ILoggerService } from '../common/logger-service/logger.service';
import type { IOlxCredentialsEntity } from './entity/olx.credentials.entity';
import type { IAdvertOlxResponse } from './interfaces';
import type { IOlxRepository } from './repository/olx.repository';

interface IOlxAvertData {
  files: { url: string }[];
  title: string;
  description: string;
  advertiserType: string;
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
  get(adminId: number): Promise<IOlxCredentialsEntity | null>;
  createAdvert(data: IOlxAvertData): Promise<IAdvertOlxResponse | null>;
}

export class OlxService implements IOlxService {
  constructor(
    private readonly _configService: IConfigService,
    private readonly _clientService: IClientService,
    private readonly _olxRepository: IOlxRepository,
    private readonly _loggerService: ILoggerService,
  ) {}

  async get(adminId: number) {
    return await this._olxRepository.get({ adminId: Number(adminId) });
  }

  async callbackOlx(code: string, adminId: number): Promise<IOlxCredentialsEntity | undefined> {
    try {
      const clientId = this._configService.get('OLX_CLIENT_ID');
      const redirectUrl = this._configService.get('OLX_REDIRECT_URL');
      const clientSecret = this._configService.get('OLX_CLIENT_SECRET');

      const { data } = await this._clientService.POST(
        'https://www.olx.ua/api/open/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
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
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }

  createAdvert(data: IOlxAvertData) {}
}
