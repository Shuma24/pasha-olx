import type { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../abstract/repository.abstract';
import type { ILoggerService } from '../common/logger-service/logger.service';
import { callBackQueryDto } from './dto/olx.dto';
import { IOlxService } from './olx.service';

export class OlxController extends BaseController {
  constructor(_loggerService: ILoggerService, private readonly _olxService: IOlxService) {
    super(_loggerService);

    this.bindRoutes(this, [
      {
        method: 'GET',
        url: '/olx/login',
        handler: this.login,
        schema: {
          response: {
            302: {},
          },
          tags: ['Olx'],
        },
      },
      {
        method: 'GET',
        url: '/olx/callback',
        handler: this.callback,
        schema: {
          tags: ['Olx'],
        },
      },
    ]);
  }

  async login(req: FastifyRequest, reply: FastifyReply) {
    const olxAuthorizationLink = await this._olxService.loginPageOlx();

    if (!olxAuthorizationLink) {
      return reply.code(500).send({ status: false, error: 'Problem with generate olx auth link' });
    }

    reply.code(200).send({ status: true, url: olxAuthorizationLink });
  }

  async callback(req: FastifyRequest<{ Querystring: callBackQueryDto }>, reply: FastifyReply) {
    if (!req.user || req.user.id) {
      reply.code(403).send({ status: false, error: 'Unauthorized' });
      return;
    }

    const { code } = req.query;
    const { id } = req.user;

    const homePage = await this._olxService.callbackOlx(code, id);

    if (!homePage) {
      reply.code(400).send({ status: false, error: 'Problem with save olx token in callback' });
      return;
    }

    reply.code(301).redirect(homePage);
  }
}
