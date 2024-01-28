import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../container/tokens';
import { OlxController } from './olx.controller';
import { OlxService } from './olx.service';
import { olxRepository } from './repository/olx.repository';

export const olxModule = new DependencyModule();

olxModule.bind(TOKENS.olxController).toInstance(OlxController).inTransientScope();
olxModule.bind(TOKENS.olxService).toInstance(OlxService).inTransientScope();
olxModule.bind(TOKENS.olxRepository).toInstance(olxRepository).inSingletonScope();

injected(OlxController, TOKENS.loggerService, TOKENS.olxService);
injected(
  OlxService,
  TOKENS.configService,
  TOKENS.clientService,
  TOKENS.olxRepository,
  TOKENS.loggerService,
);
injected(olxRepository, TOKENS.ormService);
