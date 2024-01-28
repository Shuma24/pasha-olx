import * as jwt from 'jsonwebtoken';
import type { ILoggerService } from '../../common/logger-service/logger.service';
import type { IConfigService } from '../../common/config-service/config.service';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: number;
    login: string;
  }
}

export interface IJWTService {
  generateToken(payload: { id: number; login: string }): string;
  authenticateAccessToken(accessToken: string): null | jwt.JwtPayload;
}

export class JWTService implements IJWTService {
  private readonly jwt: typeof jwt;
  private readonly tokenSecret: string;

  constructor(private readonly _loggerService: ILoggerService, _configService: IConfigService) {
    this.jwt = jwt;
    this.tokenSecret = _configService.get('TOKEN_SECRET');
    this._loggerService.info('JWTService is initialized.');
  }

  generateToken(payload: { id: number; login: string }): string {
    return this.jwt.sign(payload, this.tokenSecret, { expiresIn: '7d' });
  }

  authenticateAccessToken(accessToken: string): null | jwt.JwtPayload {
    const payload: string | jwt.JwtPayload = this.jwt.verify(accessToken, this.tokenSecret);

    if (typeof payload === 'string') return null;

    return payload;
  }
}
