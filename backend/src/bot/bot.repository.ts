import type { IORMService } from '../common/orm/orm.service';
import type { ITiresImages } from './entity/image.entity';
import { ITires } from './entity/tires.entity';

export interface IBotRepository {
  create(
    data: Omit<ITires, 'id' | 'createdAt' | 'updatedAt' | 'images'>,
  ): Promise<Omit<ITires, 'images'>>;
  createImage(url: string, tiresId: number): Promise<ITiresImages>;
  delete(id: number): Promise<boolean>;
  getById(id: number): Promise<ITires | null>;
}

export class BotRepository implements IBotRepository {
  constructor(private readonly _ormService: IORMService) {}

  async create(
    data: Omit<ITires, 'id' | 'createdAt' | 'updatedAt' | 'images'>,
  ): Promise<Omit<ITires, 'images'>> {
    const product = await this._ormService.client.tires.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        size: data.size,
        quantity: data.quantity,
        type: data.type,
      },
    });

    return product;
  }

  async createImage(url: string, tiresId: number): Promise<ITiresImages> {
    const images = await this._ormService.client.images.create({
      data: {
        tiresId: tiresId,
        url: url,
      },
    });

    return images;
  }

  async delete(id: number): Promise<boolean> {
    const del = await this._ormService.client.tires.delete({
      where: {
        id: id,
      },
    });

    return del.id ? true : false;
  }

  async getById(id: number): Promise<ITires | null> {
    const product = await this._ormService.client.tires.findFirst({
      where: {
        id: id,
      },

      include: {
        images: true,
      },
    });

    return product;
  }
}
