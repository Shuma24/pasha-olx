import { DependencyModule, injected } from 'brandi';
import { Application } from './core';
import { TOKENS } from '../container/tokens';

export const appModule = new DependencyModule();

appModule.bind(TOKENS.application).toInstance(Application).inSingletonScope();

injected(
  Application,
  TOKENS.configService,
  TOKENS.loggerService,
  TOKENS.authController,
  TOKENS.HookService,
  TOKENS.adminController,
  TOKENS.olxController,
  TOKENS.crossController,
);
