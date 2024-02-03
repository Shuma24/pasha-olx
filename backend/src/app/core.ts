import fastify, {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyRegisterOptions,
  preHandlerHookHandler,
} from 'fastify';
import type { IConfigService } from '../common/config-service/config.service';
import type { ILoggerService } from '../common/logger-service/logger.service';
import { BaseController } from '../abstract/repository.abstract';
import { IHookService } from '../common/hook-service/hook.service';
import { IORMService } from '../common/orm/orm.service';

export class Application {
  app: FastifyInstance;
  port: number;
  routes: BaseController[];

  constructor(
    private readonly _configService: IConfigService,
    private readonly _loggerService: ILoggerService,
    private readonly _authController: BaseController,
    private readonly _hookService: IHookService,
    private readonly _adminController: BaseController,
    private readonly _olxController: BaseController,
    private readonly _crossController: BaseController,
  ) {
    this.app = fastify();
    this.port = Number(this._configService.get('PORT'));
    this.routes = [_authController, _adminController, _olxController, _crossController];
  }

  registerPlugins<T>(plugin: FastifyPluginCallback, options?: FastifyRegisterOptions<T>) {
    this.app.register(plugin, options);
  }

  bindRouts() {
    this.routes.forEach((controllers) => {
      controllers._routes.forEach((route) => {
        if (!route.preHandler)
          route.preHandler = [this._hookService.execute.bind(this._hookService)];

        if (Array.isArray(route.preHandler))
          route.preHandler = [
            this._hookService.execute.bind(this._hookService),
            ...route.preHandler,
          ];

        if (route.url !== '/auth/login' && route.url !== '/' && Array.isArray(route.preHandler)) {
          route.preHandler = [
            ...route.preHandler,
            this._hookService.authGuard.bind(this._hookService),
          ];
        }
        this.app.register(async () => this.app.route(route));
      });
    });
  }

  async init() {
    this.app.listen(
      { port: this.port, path: '0.0.0.0' },
      (error: Error | null, address: string) => {
        if (error) {
          this._loggerService.error(error.message);
          process.exit(1);
        }

        this._loggerService.info(`Server is running on ${address}`);
      },
    );
  }
}
