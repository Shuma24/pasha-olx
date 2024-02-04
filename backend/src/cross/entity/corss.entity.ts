export interface ICross {
  id: number;
  tiresId: number;
  olxId: number;
}

export class CrossEntity implements Omit<ICross, 'id'> {
  tiresId: number;
  olxId: number;

  constructor(data: Omit<ICross, 'id'>) {
    this.tiresId = data.tiresId;
    this.olxId = data.olxId;
  }
}
