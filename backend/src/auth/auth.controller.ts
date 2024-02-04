import type { FastifyReply, FastifyRequest } from 'fastify';
import { BaseController } from '../abstract/repository.abstract';
import type { ILoggerService } from '../common/logger-service/logger.service';
import { loginBody, loginDTO } from './dto/body.dto';
import { loginResponse, meResponse } from './dto/response.dto';
import { IAuthService } from './services/auth.service';
import { errorResponse } from '../error/error-response';

export class AuthController extends BaseController {
  constructor(_loggerService: ILoggerService, private readonly _authService: IAuthService) {
    super(_loggerService);

    this.bindRoutes(this, [
      {
        method: 'POST',
        url: '/auth/login',
        handler: this.login,
        schema: {
          body: loginBody,
          response: {
            200: loginResponse,
            400: errorResponse,
          },
          tags: ['Auth'],
        },
      },
      {
        method: 'GET',
        url: '/auth/me',
        handler: this.me,
        schema: {
          response: {
            200: meResponse,
            401: errorResponse,
          },
          tags: ['Auth'],
        },
      },
    ]);
  }

  async login(request: FastifyRequest<{ Body: loginDTO }>, reply: FastifyReply) {
    const { login, password } = request.body;

    if (!login || !password) {
      reply.code(400).send({ status: false, error: 'No password or login' });
      return;
    }

    const ent = await this._authService.validate(login, password);

    if (!ent) {
      reply.code(400).send({ status: false, error: 'Incorrect login or password' });
      return;
    }

    const access_token = this._authService.login(ent.id, ent.login);

    reply.code(200).send({ status: true, access_token: access_token });
  }

  async me(request: FastifyRequest<{ Body: loginDTO }>, reply: FastifyReply) {
    if (request.user) {
      reply.code(200).send(request.user);
    }

    reply.code(401).send({
      status: false,
      error: 'Unauthorized',
    });
  }
}
