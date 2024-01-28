import * as bcrypt from 'bcrypt';
import type { IOlxCredentialsEntity } from '../../olx/entity/olx.credentials.entity';

export interface IAdmin {
  id: number;
  login: string;
  password: string;
  olxSettings?: IOlxCredentialsEntity;
}

export class AdminEntity implements Omit<IAdmin, 'id'> {
  login: string;
  password: string;

  constructor(data: Omit<IAdmin, 'id' | 'password'>) {
    this.login = data.login;
  }

  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    this.password = hashedPassword;
    return this;
  }

  async isValidPassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
