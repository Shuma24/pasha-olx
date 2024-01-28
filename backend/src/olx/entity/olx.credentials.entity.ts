export interface IOlxCredentialsEntity {
  id: number;
  olxToken: string;
  olxRefreshToken: string;
  expires_in: string;
  adminId: number;
}

export class OlxCredEntity implements Omit<IOlxCredentialsEntity, 'id'> {
  olxToken: string;
  olxRefreshToken: string;
  expires_in: string;
  adminId: number;

  constructor(data: Omit<IOlxCredentialsEntity, 'id'>) {
    this.olxToken = data.olxToken;
    this.olxRefreshToken = data.olxRefreshToken;
    this.expires_in = data.expires_in;
    this.adminId = data.adminId;
  }
}
