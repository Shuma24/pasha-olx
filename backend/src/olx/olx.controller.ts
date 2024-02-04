import type { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../abstract/repository.abstract';
import type { ILoggerService } from '../common/logger-service/logger.service';
import { callbackBodyDto, getAdvertsQuery } from './dto/olx.dto';
import { IOlxService } from './olx.service';

export class OlxController extends BaseController {
  constructor(_loggerService: ILoggerService, private readonly _olxService: IOlxService) {
    super(_loggerService);

    this.bindRoutes(this, [
      {
        method: 'PUT',
        url: '/olx/callback',
        handler: this.callback,
        schema: {
          body: callbackBodyDto,
          tags: ['Olx'],
        },
      },
      {
        method: 'GET',
        url: '/olx/credentials',
        handler: this.credentialsOlx,
        schema: {
          tags: ['Olx'],
        },
      },
      {
        method: 'GET',
        url: '/olx/adverts',
        handler: this.listOfAdverts,
        schema: {
          querystring: getAdvertsQuery,
          tags: ['Olx'],
        },
      },
      {
        method: 'GET',
        url: '/olx/refresh',
        handler: this.refreshOlxToken,
        schema: {
          tags: ['Olx'],
        },
      },
    ]);
  }

  async callback(req: FastifyRequest<{ Body: callbackBodyDto }>, reply: FastifyReply) {
    if (!req.user || !req.user.id) {
      reply.code(401).send({ status: false, error: 'Unauthorized' });
      return;
    }

    const { code } = req.body;
    const { id } = req.user;

    console.log(code);

    const credentials = await this._olxService.callbackOlx(code, id);

    if (!credentials) {
      reply.code(400).send({ status: false, error: 'Problem with save olx token in callback' });
      return;
    }

    reply.code(200).send({ status: true, cred: credentials });
  }

  async credentialsOlx(req: FastifyRequest, reply: FastifyReply) {
    if (!req.user || !req.user.id) {
      reply.code(401).send({ status: false, error: 'Unauthorized' });
      return;
    }

    const { id } = req.user;

    const credentials = await this._olxService.getCredentialsOlx(id);

    if (!credentials) {
      reply.code(400).send({ status: false, error: 'Problem with get olx' });
      return;
    }

    reply.code(200).send(credentials);
  }

  async listOfAdverts(req: FastifyRequest<{ Querystring: getAdvertsQuery }>, reply: FastifyReply) {
    if (!req.user || !req.user.id) {
      reply.code(401).send({ status: false, error: 'Unauthorized' });
      return;
    }

    const { page, limit } = req.query;

    const { id } = req.user;

    const listOfAdverts = await this._olxService.listOfAdverts(id, Number(page), Number(limit));

    if (!listOfAdverts) {
      reply.code(400).send({ status: false, error: 'Problem with get olx adverts' });
      return;
    }

    reply.code(200).send(listOfAdverts);
  }

  async refreshOlxToken(req: FastifyRequest, reply: FastifyReply) {
    if (!req.user || !req.user.id) {
      reply.code(403).send({ status: false, error: 'No permission' });
      return;
    }

    const newCred = await this._olxService.refresh(req.user.id);

    reply.code(200).send(newCred);
  }
}
