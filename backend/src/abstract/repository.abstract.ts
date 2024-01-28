import type { RouteOptions } from 'fastify';
import type { ILoggerService } from '../common/logger-service/logger.service';

export abstract class BaseController {
  _routes: RouteOptions[];

  constructor(private readonly _loggerService: ILoggerService) {
    this._routes = [];
  }

  protected bindRoutes(context: any, routes: RouteOptions[]): void {
    routes.forEach((route: RouteOptions) => {
      this._loggerService.info(`Route ${route.method} ${route.url} is binded`);

      const boundHandler = route.handler.bind(context);

      this._routes.push({ ...route, handler: boundHandler });
    });
  }
}
