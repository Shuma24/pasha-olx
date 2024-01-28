import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { IJWTService } from '../../auth/services/jwt.service';
import type { ILoggerService } from '../logger-service/logger.service';

export interface IHookService {
  execute(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): void;
  authGuard(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction): void;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: { id: number; login: string };
  }
}

export class HookService implements IHookService {
  constructor(private readonly _jwtService: IJWTService, private readonly _logger: ILoggerService) {
    this._logger.info('HookService is initialized.');
  }

  execute(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
    try {
      if (request.headers.authorization) {
        const token = request.headers.authorization.split(' ')[1];

        const decoded = this._jwtService.authenticateAccessToken(token);

        if (!decoded) {
          done();
          return;
        }

        request.user = decoded;
      }
      done();
    } catch (error) {
      if (error instanceof Error) {
        this._logger.error(`Error in token authentication: ${error.message}`);
        reply.code(500).send({ status: false, error: 'Internal Server Error' });
      }
    }
  }

  authGuard(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
    if (!request.user) {
      this._logger.warn('Unauthorized access attempt.');
      reply.code(401).send({ status: false, error: 'UNAUTHORIZED' });
      return;
    }
    done();
  }
}
