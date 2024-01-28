import pino, { BaseLogger, Logger } from 'pino';

export interface ILoggerService {
  info(message: string): void;
  error(message: string): void;
  warn(message: string): void;
}

export class LoggerService implements ILoggerService {
  private readonly Logger: BaseLogger;

  constructor() {
    this.Logger = pino({
      level: 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      },
      timestamp: pino.stdTimeFunctions.isoTime,
    });
  }

  info(message: string): void {
    this.Logger.info(message);
  }

  error(message: string): void {
    this.Logger.error(message);
  }

  warn(message: string): void {
    this.Logger.warn(message);
  }
}
