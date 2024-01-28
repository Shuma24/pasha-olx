import { IClientService } from '../common/client-service/client.service';
import { IConfigService } from '../common/config-service/config.service';
import { ILoggerService } from '../common/logger-service/logger.service';
import { IOlxCredentialsEntity } from './entity/olx.credentials.entity';
import { IOlxRepository } from './repository/olx.repository';

export interface IOlxService {
  callbackOlx(
    access_token: string,
    expires_in: number,
    refresh_token: string,
    adminId: number,
  ): Promise<IOlxCredentialsEntity | undefined>;
}

export class OlxService implements IOlxService {
  constructor(
    private readonly _configService: IConfigService,
    private readonly _clientService: IClientService,
    private readonly _olxRepository: IOlxRepository,
    private readonly _loggerService: ILoggerService,
  ) {}

  async callbackOlx(
    access_token: string,
    expires_in: number,
    refresh_token: string,
    adminId: number,
  ): Promise<IOlxCredentialsEntity | undefined> {
    try {
      const olxCred = await this._olxRepository.get({ adminId: adminId });

      if (!olxCred)
        throw new Error('Cant set access_token olx to db because olx credentials is required.');

      const credentials = await this._olxRepository.update(
        {
          adminId: olxCred.adminId,
          olxRefreshToken: refresh_token,
          olxToken: access_token,
          expires_in: expires_in.toString(),
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
