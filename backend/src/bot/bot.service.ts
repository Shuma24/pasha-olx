import type { ILoggerService } from '../common/logger-service/logger.service';
import type { IStorage } from '../common/storage-service/storage.service';
import type { IBotRepository } from './bot.repository';
import type { ITiresImages } from './entity/image.entity';
import { TiresEntity, type ITires } from './entity/tires.entity';

export interface IBotService {
  create(data: {
    title: string;
    description: string;
    price: string;
    size: string;
    type: string;
    quantity: string;
  }): Promise<ITires | undefined>;
  createImage(images: Buffer[], tiresID: number): Promise<{ url: string }[] | undefined>;
  delete(id: number): Promise<boolean | undefined>;
  getById(id: number): Promise<ITires | undefined>;
}

export class BotService implements IBotService {
  constructor(
    private readonly _productRepository: IBotRepository,
    private readonly _storageService: IStorage,
    private readonly _loggerService: ILoggerService,
  ) {
    this._loggerService.info('BotService initialized');
  }

  async create(data: {
    title: string;
    description: string;
    price: string;
    size: string;
    type: string;
    quantity: string;
  }): Promise<Omit<ITires, 'images'> | undefined> {
    try {
      if (!data) {
        this._loggerService.error('No data');
        throw new Error('No data');
      }

      const newTires = new TiresEntity({
        name: data.title,
        description: data.description,
        price: Number(data.price),
        type: data.type,
        quantity: Number(data.quantity),
        size: data.size,
      }).validateType(data.type);

      const createdTire = await this._productRepository.create(newTires);

      if (!createdTire) {
        this._loggerService.error('Problems with create product');
        throw new Error('Problems with create product');
      }

      return createdTire;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }

  async createImage(images: Buffer[], tiresID: number): Promise<{ url: string }[] | undefined> {
    try {
      const uploadedImages: ITiresImages[] = [];
      for (const image of images) {
        const uploadedPhoto = await this._storageService.handleFile({
          data: image,
          filename: 'tires-bot',
          encoding: 'utf8',
          mimetype: 'image/jpeg',
          limit: false,
        });

        if (!uploadedPhoto) {
          this._loggerService.error('Problem with upload to cloud');
          throw new Error('Problem with upload to cloud');
        }

        const newImage = await this._productRepository.createImage(uploadedPhoto.url, tiresID);

        uploadedImages.push(newImage);
      }

      const imagesUrl = uploadedImages.map((item) => {
        return {
          url: item.url,
        };
      });

      return imagesUrl;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }

  async delete(id: number): Promise<boolean | undefined> {
    try {
      const product = await this.getById(id);

      if (!product) {
        this._loggerService.error('Incorrect id');
        throw new Error('Incorrect id');
      }

      if (product.images) {
        for (let i = 0; i < product.images.length; i++) {
          const baseURL = 'https://tiresbotbucket.s3.eu-central-1.amazonaws.com/';

          const key = decodeURIComponent(product.images[i].url.replace(baseURL, ''));

          await this._storageService.deleteFile(key);
        }
      }

      const delResult = await this._productRepository.delete(id);

      return delResult;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }

  async getById(id: number): Promise<ITires | undefined> {
    try {
      if (!id) {
        this._loggerService.error('No id');
        return;
      }

      const product = await this._productRepository.getById(id);

      if (!product) {
        this._loggerService.error('Bad ID or another problem');
        return;
      }

      return product;
    } catch (error) {
      if (error instanceof Error) {
        this._loggerService.error(error.message);
        throw new Error(error.message);
      }
    }
  }
}
