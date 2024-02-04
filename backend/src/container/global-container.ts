import { Container } from 'brandi';
import { TOKENS } from './tokens';
import { commonModule } from '../common/common.module';
import { appModule } from '../app/app.module';
import { adminModule } from '../admin/admin.module';
import { authModule } from '../auth/auth.module';
import { olxModule } from '../olx/olx.module';
import { crossModule } from '../cross/cross.module';
import { botModule } from '../bot/bot.module';

export const globalContainer = new Container();

globalContainer.use(TOKENS.application).from(appModule);
globalContainer.use(TOKENS.loggerService).from(commonModule);
globalContainer.use(TOKENS.configService).from(commonModule);
globalContainer.use(TOKENS.ormService).from(commonModule);
globalContainer.use(TOKENS.HookService).from(commonModule);
globalContainer.use(TOKENS.clientService).from(commonModule);
globalContainer.use(TOKENS.storageService).from(commonModule);

globalContainer.use(TOKENS.adminController).from(adminModule);
globalContainer.use(TOKENS.adminService).from(adminModule);
globalContainer.use(TOKENS.adminRepository).from(adminModule);

globalContainer.use(TOKENS.authController).from(authModule);
globalContainer.use(TOKENS.authService).from(authModule);
globalContainer.use(TOKENS.JWTService).from(authModule);

globalContainer.use(TOKENS.olxController).from(olxModule);
globalContainer.use(TOKENS.olxService).from(olxModule);
globalContainer.use(TOKENS.olxRepository).from(olxModule);

globalContainer.use(TOKENS.crossController).from(crossModule);
globalContainer.use(TOKENS.crossService).from(crossModule);
globalContainer.use(TOKENS.crossRepository).from(crossModule);

globalContainer.use(TOKENS.botService).from(botModule);
globalContainer.use(TOKENS.botRepository).from(botModule);
