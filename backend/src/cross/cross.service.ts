import { ILoggerService } from '../common/logger-service/logger.service';
import { ICrossRepository } from './cross.repository';
import { CrossListQuery } from './dto/cross.dto';
import { CrossEntity, ICross } from './entity/corss.entity';

export interface ICrossService {
  create(data: { tiresId: number; olxId: number }): Promise<ICross>;
  delete(id: number): Promise<boolean>;
  getBytTiresId(id: number): Promise<ICross | undefined>;
  getListTires(query: CrossListQuery): Promise<
    | {
        tires: {
          tires: {
            id: number;
            name: string;
            description: string;
            price: number;
            size: string;
            quantity: number;
            type: string;
            createdAt: Date | null;
            updatedAt: Date | null;
          };
        }[];
        page: number;
        total: number;
        lastPage: number;
      }
    | undefined
  >;
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

  async getListTires(query: CrossListQuery) {
    const pageSize = Number(query.pageSize) || 10;
    const skipPage = Number(query.skipPage) || 0;

    const { tires, total } = await this._crossRepository.getList({
      skipPage: skipPage,
      pageSize: pageSize,
      search: query.search,
    });

    if (!tires) return undefined;

    const totalPages = Math.ceil(total / pageSize);

    const currentPage = skipPage >= totalPages ? totalPages - 1 : skipPage;

    return {
      tires: tires,
      page: currentPage,
      total: total,
      lastPage: totalPages,
    };
  }
}
