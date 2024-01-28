import type { IAdminService } from '../../admin/admin.service';
import { AdminEntity } from '../../admin/entity/admin.entity';
import type { ILoggerService } from '../../common/logger-service/logger.service';
import type { IJWTService } from './jwt.service';

export interface IAuthService {
  login(id: number, login: string): string;
  validate(login: string, password: string): Promise<{ id: number; login: string } | undefined>;
}

export class AuthService implements IAuthService {
  constructor(
    private readonly _loggerService: ILoggerService,
    private readonly _adminService: IAdminService,
    private readonly _jwtService: IJWTService,
  ) {
    this._loggerService.info('AuthService is initialized.');
  }

  login(id: number, login: string): string {
    console.log(id);
    const access_token = this._jwtService.generateToken({ id: id, login: login });

    return access_token;
  }

  async validate(login: string, password: string) {
    try {
      const admin = await this._adminService.get({ login: login });

      if (!admin) {
        this._loggerService.error('Invalid admin');
        return undefined;
      }

      const isCorrectPassword = await new AdminEntity({
        login: login,
      }).isValidPassword(password, admin.password);

      if (!isCorrectPassword) {
        this._loggerService.error('Incorrect login or password');
        return undefined;
      }

      return {
        id: admin.id,
        login: admin.login,
      };
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }
}
