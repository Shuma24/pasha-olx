import type { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../abstract/repository.abstract';
import type { ILoggerService } from '../common/logger-service/logger.service';
import { CrossBody, CrossDeleteQuery } from './dto/cross.dto';
import type { IFile } from '../common/storage-service/storage.service';
import { IBotService } from '../bot/bot.service';
import { IOlxService } from '../olx/olx.service';
import { ICrossService } from './cross.service';

type CrossBodyReq = {
  files: Buffer[];
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
  constructor(
    _loggerService: ILoggerService,
    private readonly _botService: IBotService,
    private readonly _olxService: IOlxService,
    private readonly _crossService: ICrossService,
  ) {
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
      {
        method: 'DELETE',
        url: '/cross/delete',
        handler: this.deleteCross,
        schema: {
          querystring: CrossDeleteQuery,
          tags: ['Cross'],
        },
      },
    ]);
  }

  async createCross(request: FastifyRequest<{ Body: CrossBodyReq }>, reply: FastifyReply) {
    if (!request.user) {
      reply.code(401).send({ status: false, message: 'Unauthorized' });
      return;
    }

    const { id } = request.user;

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

    const createOlxAdvert = await this._olxService.createAdvert(
      {
        title: title,
        type: type,
        description: description,
        price: price,
        quantity: quantity,
        files: tiresImages,
        advertiserType: advertiserType as 'private' | 'business',
        size: size,
        year: year,
        state: state,
        brand: brand,
      },
      id,
    );

    if (!createOlxAdvert) {
      reply.code(404).send({ status: false, error: 'Problem with upload olx' });
      return;
    }

    const crossEntity = await this._crossService.create({
      tiresId: tires.id,
      olxId: createOlxAdvert,
    });

    if (!crossEntity) {
      reply.code(404).send({ status: false, error: 'Problem with create cross entity' });
      return;
    }

    return reply.code(200).send({
      olxId: createOlxAdvert,
      tiresId: tires.id,
      crossId: crossEntity.id,
    });
  }

  async deleteCross(
    request: FastifyRequest<{ Querystring: CrossDeleteQuery }>,
    reply: FastifyReply,
  ) {
    if (!request.user) {
      reply.code(401).send({ status: false, message: 'Unauthorized' });
      return;
    }
    const { id } = request.query;

    //get cross
    const cross = await this._crossService.getBytTiresId(Number(id));

    if (!cross) {
      reply
        .code(400)
        .send({ status: false, message: 'Bad cross id or problem with find cross by tiresId' });
      return;
    }

    const tireId = cross.tiresId;
    const olxId = cross.olxId;

    //delete cross
    const result = await this._crossService.delete(Number(id));

    if (!result) {
      reply.code(400).send({ status: false, message: 'Error delete cross' });
      return;
    }

    //bot delete
    const deleteTiresBotResult = await this._botService.delete(tireId);

    if (!deleteTiresBotResult) {
      reply.code(400).send({ status: false, message: 'Problem to delete bot tires from cross' });
      return;
    }

    //olx delete

    const deleteOlxResult = await this._olxService.delete(olxId, request.user.id);

    if (!deleteOlxResult) {
      reply.code(400).send({ status: false, message: 'Problem to delete olx advert from cross' });
      return;
    }

    reply.code(200).send({
      status: result,
      message: 'Deleted',
    });
  }

  async getList(request: FastifyRequest, reply: FastifyReply) {
    const test = await this._crossService.getListTires();

    reply.code(200).send(test);
  }
}
