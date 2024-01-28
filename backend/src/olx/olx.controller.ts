import type { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../abstract/repository.abstract';
import type { ILoggerService } from '../common/logger-service/logger.service';
import { callbackBodyDto } from './dto/olx.dto';
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
    ]);
  }

  async callback(req: FastifyRequest<{ Body: callbackBodyDto }>, reply: FastifyReply) {
    if (!req.user || !req.user.id) {
      reply.code(403).send({ status: false, error: 'Unauthorized' });
      return;
    }

    const { id } = req.user;

    const { access_token, refresh_token, expires_in } = req.body;

    const credentials = await this._olxService.callbackOlx(
      access_token,
      expires_in,
      refresh_token,
      id,
    );

    if (!credentials) {
      reply.code(400).send({ status: false, error: 'Problem with save olx token in callback' });
      return;
    }

    reply.code(200).send({ status: true, cred: credentials });
  }
}
