import { DependencyModule, injected } from 'brandi';
import { TOKENS } from '../container/tokens';
import { BotRepository } from './bot.repository';
import { BotService } from './bot.service';

export const botModule = new DependencyModule();

botModule.bind(TOKENS.botRepository).toInstance(BotRepository).inSingletonScope();
botModule.bind(TOKENS.botService).toInstance(BotService).inTransientScope();

injected(BotService, TOKENS.botRepository, TOKENS.storageService, TOKENS.loggerService);
injected(BotRepository, TOKENS.ormService);
