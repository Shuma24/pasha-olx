import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../container/tokens';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JWTService } from './services/jwt.service';

export const authModule = new DependencyModule();

authModule.bind(TOKENS.authController).toInstance(AuthController).inTransientScope();
authModule.bind(TOKENS.authService).toInstance(AuthService).inTransientScope();
authModule.bind(TOKENS.JWTService).toInstance(JWTService).inSingletonScope();

injected(AuthController, TOKENS.loggerService, TOKENS.authService);
injected(AuthService, TOKENS.loggerService, TOKENS.adminService, TOKENS.JWTService);
injected(JWTService, TOKENS.loggerService, TOKENS.configService);
