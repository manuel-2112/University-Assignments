import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3ImageFolder } from '@components/imagesUpload/imagesUpload.enum';

const s3 = new S3Client({
  region: 'us-east-2',
});

const bucketName = 'agtech-public-media-images';

const uploadTo = (dirname: string) => {
  const getSubdirectory = (params) => {
    let subdirectory: string = '';
    let objectName: string;
    switch (dirname) {
      case S3ImageFolder.COMPANY:
        objectName = params.company_id;
        break;
      case S3ImageFolder.SERVICE:
        objectName = Date.now().toString();
        subdirectory = `${params.service_id}/`;
        break;
      case S3ImageFolder.NEWS:
        objectName = Date.now().toString();
        subdirectory = `${params.news_id}/`;
        break;
      default:
        break;
    }

    return { subdirectory, objectName };
  };

  return {
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key(req, file, cb) {
        const fileExtension = file.originalname.split('.').pop();
        const { subdirectory, objectName } = getSubdirectory(req.params);
        const fullPath = `${
          dirname + subdirectory
        }${objectName}.${fileExtension}`;
        cb(null, fullPath);
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
    }),
  };
};

export const uploadCompany = multer(uploadTo(S3ImageFolder.COMPANY));
export const uploadService = multer(uploadTo(S3ImageFolder.SERVICE));
export const uploadNews = multer(uploadTo(S3ImageFolder.NEWS));
