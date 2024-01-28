import { IClientService } from '../common/client-service/client.service';
import { IConfigService } from '../common/config-service/config.service';
import { ILoggerService } from '../common/logger-service/logger.service';
import { OlxCredEntity } from './entity/olx.credentials.entity';
import { createOlxLoginLink, createTokenUrl } from './helpers/url-generate';
import { IOlxRepository } from './repository/olx.repository';

export interface IOlxService {
  loginPageOlx(): Promise<string>;
  callbackOlx(code: string, adminId: number): Promise<string | undefined>;
}

export class OlxService implements IOlxService {
  constructor(
    private readonly _configService: IConfigService,
    private readonly _clientService: IClientService,
    private readonly _olxRepository: IOlxRepository,
    private readonly _loggerService: ILoggerService,
  ) {}

  async loginPageOlx(): Promise<string> {
    const clientId = this._configService.get('OLX_CLIENT_ID');
    const redirectUrl = this._configService.get('OLX_REDIRECT_URL');

    if (!clientId || !redirectUrl) throw new Error('ClientId or CallbackUrl olx not set.');

    const olxLoginUrl = createOlxLoginLink(clientId, redirectUrl);

    return olxLoginUrl;
  }

  async callbackOlx(code: string, adminId: number): Promise<string | undefined> {
    try {
      const clientId = this._configService.get('OLX_CLIENT_ID');
      const redirectUrl = this._configService.get('OLX_REDIRECT_URL');
      const clientSecret = this._configService.get('OLX_CLIENT_SECRET');
      const homePage = this._configService.get('FRONT_HOME_PAGE');

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
          code: code,
          redirect_uri: redirectUrl,
        },
      });

      if (!data) throw new Error('Problems with olx /auth/token');

      const olxCred = await this._olxRepository.get({ adminId: adminId });

      if (!olxCred)
        throw new Error('Cant set access_token olx to db because olx credentials is required.');

      await this._olxRepository.update(
        {
          adminId: olxCred.adminId,
          olxRefreshToken: data.refresh_token,
          olxToken: data.access_token,
          expires_in: data.expires_in.toString(),
        },
        olxCred.id,
      );

      return homePage;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }
}
