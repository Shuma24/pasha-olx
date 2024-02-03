export interface ITiresImages {
  id: number;
  tiresId: number | null;
  url: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export class ImagesEntity implements Omit<ITiresImages, 'id' | 'createdAt' | 'updatedAt'> {
  tiresId: number | null;
  url: string;

  constructor(data: Omit<ITiresImages, 'id' | 'createdAt' | 'updatedAt'>) {
    this.tiresId = data.tiresId;
    this.url = data.url;
  }
}
