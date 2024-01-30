import { IClientService } from '../common/client-service/client.service';
import { IConfigService } from '../common/config-service/config.service';
import { ILoggerService } from '../common/logger-service/logger.service';
import { IOlxCredentialsEntity } from './entity/olx.credentials.entity';
import { IOlxRepository } from './repository/olx.repository';

export interface IOlxService {
  callbackOlx(code: string, adminId: number): Promise<IOlxCredentialsEntity | undefined>;
  get(adminId: number): Promise<IOlxCredentialsEntity | null>;
  listOfAdverts(adminId: number): Promise<IOlxAdvertsResponse | never[]>;
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

  async listOfAdverts(adminId: number) {
    const cred = await this.get(adminId);
    if (!cred) throw new Error('Set olx credentials');

    const { data } = await this._clientService.GET<IOlxAdvertsResponse>(
      'https://www.olx.ua/api/partner/adverts',
      {
        headers: {
          Version: 'v2',
          Authorization: `Bearer ${cred.olxToken}`,
        },
      },
    );

    if (!data) {
      throw new Error('Problem with fetch adverts check token life');
    }

    return data;
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
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }
}
