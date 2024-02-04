import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../container/tokens';
import { CrossController } from './cross.controller';

export const crossModule = new DependencyModule();

crossModule.bind(TOKENS.crossController).toInstance(CrossController).inTransientScope();

injected(CrossController, TOKENS.loggerService, TOKENS.botService, TOKENS.olxService);
