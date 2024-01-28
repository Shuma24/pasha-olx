import { IORMService } from '../../common/orm/orm.service';
import { IAdmin } from '../entity/admin.entity';

export interface IAdminRepository {
  update(updateData: { id: number; login?: string; password?: string }): Promise<IAdmin>;
  get(data: { login?: string; id?: number }): Promise<IAdmin | null>;
}

export class AdminRepository implements IAdminRepository {
  constructor(private readonly _ormService: IORMService) {}
  async update(updateData: { id: number; login?: string; password?: string }): Promise<IAdmin> {
    const updateSettings = {};

    updateData.login && (updateSettings['login'] = updateData.login);
    updateData.password && (updateSettings['password'] = updateData.password);

    const updatedAdmin = await this._ormService.client.apiAdmin.update({
      where: {
        id: updateData.id,
      },
      data: updateSettings,
    });

    return updatedAdmin;
  }

  async get(data: { login?: string; id?: number }): Promise<IAdmin | null> {
    let settings = {};

    if (data.id) {
      settings = {
        id: data.id,
      };
    } else {
      settings = {
        login: data.login,
      };
    }

    const admin = await this._ormService.client.apiAdmin.findFirst({
      where: settings,
    });

    return admin;
  }
}
