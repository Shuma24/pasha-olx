import { ITiresImages } from './image.entity';

export interface ITires {
  id: number;
  name: string;
  images?: ITiresImages[];
  description: string;
  price: number;
  size: string;
  quantity: number;
  type: string;
  crossId?: number;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export class TiresEntity implements Omit<ITires, 'id' | 'createdAt' | 'updatedAt' | 'images'> {
  type: string;
  name: string;
  description: string;
  price: number;
  size: string;
  quantity: number;

  constructor(data: Omit<ITires, 'id' | 'createdAt' | 'updatedAt' | 'images'>) {
    this.type = data.type;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.quantity = data.quantity;
    this.size = data.size;
  }

  validateType(type: string) {
    if (type === 'summer' || type === 'winter' || type === 'allseason') {
      this.type = type;
    } else {
      this.type = 'summer';
    }

    return this;
  }
}
