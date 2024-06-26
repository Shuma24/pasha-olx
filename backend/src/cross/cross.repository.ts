import type { IORMService } from '../common/orm/orm.service';
import type { ICross } from './entity/corss.entity';

export interface ICrossRepository {
  create(tiresId: number, olxId: number): Promise<ICross>;
  delete(id: number): Promise<ICross>;
  getByTiresId(id: number): Promise<ICross | null>;
  getList(query: { pageSize: number; skipPage: number; search?: string }): Promise<{
    tires: ({
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
    } & {})[];
    total: number;
  }>;
}

export class CrossRepository implements ICrossRepository {
  constructor(private readonly _ormService: IORMService) {}
  async create(tiresId: number, olxId: number): Promise<ICross> {
    const data = await this._ormService.client.crossIds.create({
      data: {
        olxId: olxId,
        tiresId: tiresId,
      },
    });

    await this._ormService.client.$disconnect();

    return data;
  }

  async delete(id: number) {
    const deleteResult = await this._ormService.client.crossIds.delete({ where: { tiresId: id } });

    await this._ormService.client.$disconnect();

    return deleteResult;
  }

  async getByTiresId(id: number): Promise<ICross | null> {
    const cross = await this._ormService.client.crossIds.findFirst({
      where: {
        tiresId: id,
      },
    });

    await this._ormService.client.$disconnect();

    return cross;
  }

  async getList(query: { pageSize: number; skipPage: number; search?: string }) {
    const tires = await this._ormService.client.crossIds.findMany({
      take: query.pageSize,
      skip: query.pageSize * query.skipPage,
      include: {
        tires: {
          include: {
            images: true,
          },
        },
      },
      where: {
        tires: {
          name: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
      },
    });

    const totalTiresCount = await this._ormService.client.crossIds.count({
      where: {
        tires: {
          NOT: {
            crossIds: null,
          },
        },
      },
    });

    return {
      tires: tires,
      total: totalTiresCount,
    };
  }
}
