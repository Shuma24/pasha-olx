import type { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../abstract/repository.abstract';
import type { ILoggerService } from '../common/logger-service/logger.service';
import { CrossBody } from './dto/cross.dto';
import type { IFile } from '../common/storage-service/storage.service';
import { IBotService } from '../bot/bot.service';

type CrossBodyReq = {
  files: IFile[];
  title: string;
  description: string;
  advertiserType: string;
  price: string;
  size: string;
  type: string;
  quantity: string;
  year: string;
  state: string;
  brand: string;
};

export class CrossController extends BaseController {
  constructor(_loggerService: ILoggerService, private readonly _botService: IBotService) {
    super(_loggerService);

    this.bindRoutes(this, [
      {
        method: 'POST',
        url: '/cross/create',
        handler: this.createCross,
        schema: {
          consumes: ['multipart/form-data'],
          body: CrossBody,
          tags: ['Cross'],
        },
      },
    ]);
  }

  async createCross(request: FastifyRequest<{ Body: CrossBodyReq }>, reply: FastifyReply) {
    const {
      title,
      type,
      description,
      price,
      quantity,
      files,
      advertiserType,
      size,
      year,
      state,
      brand,
    } = request.body;

    const tires = await this._botService.create({
      title: title,
      type: type,
      description: description,
      price: price,
      quantity: quantity,
      size: size,
    });

    if (!tires) {
      reply.code(404).send({ status: false, error: 'Problem to create tires in bot' });
      return;
    }

    const tiresImages = await this._botService.createImage(files, tires.id);

    if (!tiresImages) {
      reply.code(404).send({ status: false, error: 'Problem to create tires images in bot' });
      return;
    }

    return reply.code(200).send(request.body);
  }
}
