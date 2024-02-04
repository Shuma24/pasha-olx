import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../container/tokens';
import { CrossController } from './cross.controller';
import { CrossService } from './cross.service';
import { CrossRepository } from './cross.repository';

export const crossModule = new DependencyModule();

crossModule.bind(TOKENS.crossController).toInstance(CrossController).inTransientScope();
crossModule.bind(TOKENS.crossService).toInstance(CrossService).inTransientScope();
crossModule.bind(TOKENS.crossRepository).toInstance(CrossRepository).inSingletonScope();

injected(
  CrossController,
  TOKENS.loggerService,
  TOKENS.botService,
  TOKENS.olxService,
  TOKENS.crossService,
);
injected(CrossService, TOKENS.loggerService, TOKENS.crossRepository);
injected(CrossRepository, TOKENS.ormService);
