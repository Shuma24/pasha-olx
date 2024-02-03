import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../container/tokens';
import { LoggerService } from './logger-service/logger.service';
import { ConfigService } from './config-service/config.service';
import { ORMService } from './orm/orm.service';
import { HookService } from './hook-service/hook.service';
import { ClientService } from './client-service/client.service';
import { S3Storage } from './storage-service/storage.service';

export const commonModule = new DependencyModule();

commonModule.bind(TOKENS.loggerService).toInstance(LoggerService).inSingletonScope();
commonModule.bind(TOKENS.configService).toInstance(ConfigService).inSingletonScope();
commonModule.bind(TOKENS.ormService).toInstance(ORMService).inSingletonScope();
commonModule.bind(TOKENS.HookService).toInstance(HookService).inSingletonScope();
commonModule.bind(TOKENS.clientService).toInstance(ClientService).inSingletonScope();
commonModule.bind(TOKENS.storageService).toInstance(S3Storage).inSingletonScope();

injected(ConfigService, TOKENS.loggerService);
injected(ORMService, TOKENS.loggerService);
injected(HookService, TOKENS.JWTService, TOKENS.loggerService);
injected(S3Storage, TOKENS.configService, TOKENS.loggerService);
