import { Express } from 'express';

export interface MulterS3File extends Express.Multer.File {
  location: string;
}
