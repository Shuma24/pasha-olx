import {
  CompleteMultipartUploadCommandOutput,
  PutObjectCommandInput,
  S3Client,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { IConfigService } from '../config-service/config.service';
import { ILoggerService } from '../logger-service/logger.service';
import { generateRandomPassword } from 'random-password-generator-2022';

export interface inputFiles {
  data: Buffer;
  filename: string;
  encoding: string;
  mimetype: string;
  limit: boolean;
}

export interface IFile {
  type: string;
  data: Buffer;
}

export interface IUploadResponse {
  url: string;
  filename: string;
}

export interface IStorage {
  handleFile(file: inputFiles): Promise<IUploadResponse | undefined>;
  deleteFile(key: string): Promise<true | undefined>;
}

export class S3Storage implements IStorage {
  private readonly bucketName: string;
  private readonly region: string;
  private readonly s3Client: S3Client;

  constructor(
    private readonly _configService: IConfigService,
    private readonly _loggerService: ILoggerService,
  ) {
    this.bucketName = _configService.get('AWS_PUBLIC_BUCKET_NAME');
    this.region = _configService.get('AWS_REGION');

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: _configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: _configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    this._loggerService.info('S3Storage initialized');
  }

  async handleFile(file: inputFiles): Promise<IUploadResponse | undefined> {
    const randomName = generateRandomPassword({ passwordLength: 10 });

    const params: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: `${randomName}-${file.filename}`,
      Body: file.data,
      ContentType: file.mimetype,
    };

    try {
      const upload = new Upload({
        client: this.s3Client,
        params,
      });

      const data: CompleteMultipartUploadCommandOutput = await upload.done();

      if (!data) {
        throw new Error('S3 Upload Error');
      }

      if (data.$metadata.httpStatusCode !== 200) {
        throw new Error('S3 Upload Error');
      }

      if (data.Bucket && data.Key && data.Location) {
        return {
          url: data.Location,
          filename: data.Key,
        };
      } else {
        throw new Error('S3 Upload Error');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async deleteFile(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this._configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: key,
      });

      await this.s3Client.send(command);

      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
