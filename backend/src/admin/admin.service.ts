import { ILoggerService } from '../common/logger-service/logger.service';

import { AdminEntity, type IAdmin } from './entity/admin.entity';
import type { IAdminRepository } from './repository/admin.repository';

export interface IAdminService {
  update(id: number, login?: string, password?: string): Promise<IAdmin | undefined>;
  get(data: { login?: string; id?: number }): Promise<IAdmin | undefined>;
}

export class AdminService implements IAdminService {
  constructor(
    private readonly _adminRepository: IAdminRepository,
    private readonly _loggerService: ILoggerService,
  ) {
    this._loggerService.info('ADMIN SERVICE is initialized.');
  }

  async get(data: { login?: string; id?: number }): Promise<IAdmin | undefined> {
    if (data.login && data.id) return undefined;

    let searchBy = {};

    data.login && (searchBy['login'] = data.login);
    data.id && (searchBy['id'] = data.id);

    const user = await this._adminRepository.get(searchBy);

    if (!user) {
      return undefined;
    }

    return user;
  }

  async update(id: number, login?: string, newPassword?: string) {
    const admin = await this.get({ id: id });

    if (!admin) {
      return undefined;
    }

    const adminEntity = new AdminEntity({
      login: login ? login : admin.login,
    });

    newPassword && (await adminEntity.hashPassword(newPassword));

    const updateAdmin = await this._adminRepository.update({ id: id, ...adminEntity });

    return updateAdmin;
  }
}
