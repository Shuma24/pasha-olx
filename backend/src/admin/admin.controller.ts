import type { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../abstract/repository.abstract';
import type { ILoggerService } from '../common/logger-service/logger.service';
import { UpdateAdminResponse } from './dto/response.dto';
import { updateAdminBody, updateAdminDTO } from './dto/body.dto';
import { errorResponse } from '../error/error-response';
import { IAdminService } from './admin.service';

export class AdminController extends BaseController {
  constructor(_loggerService: ILoggerService, private readonly _adminService: IAdminService) {
    super(_loggerService);

    this.bindRoutes(this, [
      {
        method: 'PUT',
        url: '/admin/update',
        handler: this.updateAdmin,
        schema: {
          body: updateAdminBody,
          response: {
            200: UpdateAdminResponse,
            400: errorResponse,
          },
          tags: ['Admin'],
        },
      },
    ]);
  }

  async updateAdmin(request: FastifyRequest<{ Body: updateAdminDTO }>, reply: FastifyReply) {
    if (!request.user?.id) {
      reply.code(400).send({ status: false, error: 'bad request no admin credentials' });
    }

    const { login, password } = request.body;

    const updatedUser = this._adminService.update(Number(request.user?.id), login, password);

    if (!updatedUser) {
      reply.code(400).send({ status: false, error: 'Problem with update' });
    }

    reply.code(200).send({ status: true });
  }
}
