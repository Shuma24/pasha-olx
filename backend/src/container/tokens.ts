import { token } from 'brandi';
import { Application } from '../app/core';
import type { ILoggerService } from '../common/logger-service/logger.service';
import type { IConfigService } from '../common/config-service/config.service';
import { BaseController } from '../abstract/repository.abstract';
import type { IORMService } from '../common/orm/orm.service';
import type { IAdminService } from '../admin/admin.service';
import type { IAdminRepository } from '../admin/repository/admin.repository';
import type { IAuthService } from '../auth/services/auth.service';
import type { IJWTService } from '../auth/services/jwt.service';
import type { IHookService } from '../common/hook-service/hook.service';
import { IClientService } from '../common/client-service/client.service';
import { IOlxService } from '../olx/olx.service';
import { IOlxRepository } from '../olx/repository/olx.repository';
import { IStorage } from '../common/storage-service/storage.service';
import { IBotRepository } from '../bot/bot.repository';
import { IBotService } from '../bot/bot.service';

export const TOKENS = {
  application: token<Application>('application'),
  loggerService: token<ILoggerService>('loggerService'),
  configService: token<IConfigService>('configService'),
  ormService: token<IORMService>('ormService'),
  adminController: token<BaseController>('adminController'),
  adminService: token<IAdminService>('adminService'),
  adminRepository: token<IAdminRepository>('adminRepository'),
  authController: token<BaseController>('authController'),
  authService: token<IAuthService>('authService'),
  JWTService: token<IJWTService>('JWTService'),
  HookService: token<IHookService>('hookService'),
  clientService: token<IClientService>('clientService'),
  olxController: token<BaseController>('olxController'),
  olxService: token<IOlxService>('olxService'),
  olxRepository: token<IOlxRepository>('olxRepository'),
  storageService: token<IStorage>('storageService'),
  crossController: token<BaseController>('crossController'),
  botRepository: token<IBotRepository>('botRepository'),
  botService: token<IBotService>('botService'),
};
