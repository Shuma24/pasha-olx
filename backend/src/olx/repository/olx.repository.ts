import type { IORMService } from '../../common/orm/orm.service';
import { IOlxCredentialsEntity } from '../entity/olx.credentials.entity';

export interface IOlxRepository {
  update(
    updateData: Omit<IOlxCredentialsEntity, 'id'>,
    id: number,
  ): Promise<IOlxCredentialsEntity | null>;
  get(data: { adminId?: number; id?: number }): Promise<IOlxCredentialsEntity | null>;
}

export class olxRepository implements IOlxRepository {
  constructor(private readonly _ormService: IORMService) {}

  async update(
    updateData: Omit<IOlxCredentialsEntity, 'id'>,
    id: number,
  ): Promise<IOlxCredentialsEntity> {
    const updateSettings = {};

    updateData.olxToken && (updateSettings['olxToken'] = updateData.olxToken);
    updateData.olxRefreshToken && (updateSettings['olxRefreshToken'] = updateData.olxRefreshToken);
    updateData.expires_in && (updateSettings['expires_in'] = updateData.expires_in);
    updateData.adminId && (updateSettings['adminId'] = updateData.adminId);

    const updatedOlxCred = await this._ormService.client.olxCredetnials.update({
      where: {
        id: id,
      },
      data: updateSettings,
    });

    await this._ormService.client.$disconnect();

    return updatedOlxCred;
  }

  async get(data: { adminId?: number; id?: number }): Promise<IOlxCredentialsEntity | null> {
    let settings = {};

    if (data.id) {
      settings = {
        id: data.id,
      };
    } else {
      settings = {
        adminId: data.adminId,
      };
    }

    const olxCred = await this._ormService.client.olxCredetnials.findFirst({
      where: settings,
    });

    await this._ormService.client.$disconnect();

    return olxCred;
  }
}
