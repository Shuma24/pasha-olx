import { IClientService } from '../common/client-service/client.service';
import { IConfigService } from '../common/config-service/config.service';
import { ILoggerService } from '../common/logger-service/logger.service';
import { IOlxCredentialsEntity } from './entity/olx.credentials.entity';
import { IOlxRepository } from './repository/olx.repository';

export interface IOlxService {
  callbackOlx(code: string, adminId: number): Promise<IOlxCredentialsEntity | undefined>;
}

export class OlxService implements IOlxService {
  constructor(
    private readonly _configService: IConfigService,
    private readonly _clientService: IClientService,
    private readonly _olxRepository: IOlxRepository,
    private readonly _loggerService: ILoggerService,
  ) {}

  async callbackOlx(code: string, adminId: number): Promise<IOlxCredentialsEntity | undefined> {
    try {
      const clientId = this._configService.get('OLX_CLIENT_ID');
      const redirectUrl = this._configService.get('OLX_REDIRECT_URL');
      const clientSecret = this._configService.get('OLX_CLIENT_SECRET');

      console.log(clientId);
      console.log(redirectUrl);
      console.log(clientSecret);

      const { data } = await this._clientService.POST<{
        access_token: string;
        expires_in: number;
        token_type: string;
        scope: string;
        refresh_token: string;
      }>('https://www.olx.ua/api/open/oauth/token', {
        data: {
          grant_type: 'authorization_code',
          client_id: clientId,
          client_secret: clientSecret,
          code: code.trim(),
          redirect_uri: redirectUrl,
        },
      });

      console.log(data);

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

      console.log(credentials);

      if (!credentials) return undefined;

      return credentials;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }
}
