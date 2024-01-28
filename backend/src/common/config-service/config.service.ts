import { DotenvParseOutput, config } from 'dotenv';
import type { ILoggerService } from '../logger-service/logger.service';

export interface IConfigService {
  get(key: string): string;
}

export class ConfigService implements IConfigService {
  config: DotenvParseOutput;

  constructor(private readonly _loggerService: ILoggerService) {
    const { error, parsed } = config();

    if (error) throw new Error(error.message);

    if (!parsed) throw new Error('.env is empty');

    this.config = parsed;

    this._loggerService.info('ConfigService is initialized.');
  }
  get(key: string): string {
    const result = this.config[key];
    if (!result) throw new Error('ENV Key is required.');

    return result;
  }
}
