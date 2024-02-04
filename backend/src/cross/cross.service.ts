import { ILoggerService } from '../common/logger-service/logger.service';
import { ICrossRepository } from './cross.repository';
import { CrossEntity, ICross } from './entity/corss.entity';

export interface ICrossService {
  create(data: { tiresId: number; olxId: number }): Promise<ICross>;
  delete(id: number): Promise<boolean>;
  getBytTiresId(id: number): Promise<ICross | undefined>;
  getListTires(): Promise<any>;
}

export class CrossService implements ICrossService {
  constructor(
    private readonly _loggerService: ILoggerService,
    private readonly _crossRepository: ICrossRepository,
  ) {
    this._loggerService.info('CrossService initialized');
  }
  async create(data: { tiresId: number; olxId: number }): Promise<ICross> {
    const crossEntity = new CrossEntity({ ...data });

    const cross = await this._crossRepository.create(crossEntity.tiresId, crossEntity.olxId);

    return cross;
  }

  async delete(id: number) {
    const delResult = await this._crossRepository.delete(id);

    if (delResult) {
      return true;
    } else {
      return false;
    }
  }

  async getBytTiresId(id: number) {
    const cross = await this._crossRepository.getByTiresId(id);

    if (!cross) return undefined;

    return cross;
  }

  async getListTires() {
    const cross = await this._crossRepository.getList();

    if (!cross) return undefined;

    return cross;
  }
}
