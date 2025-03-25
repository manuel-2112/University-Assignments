import { Router } from 'express';
import { validatePermissions } from '@core/middlewares/validate.middleware';
import { AllowedEntities as allowedEntities } from '@components/authentication/entities.enum';
import {
  uploadCompany,
  uploadService,
  uploadNews,
} from '@core/utils/imageUploader';
import {
  setCompanyImage,
  setServiceImage,
  setNewsImage,
  deleteCompanyLogo,
  deleteServiceImage,
  deleteNewsImage,
} from './imagesUpload.controller';
import { isValidRequestFormat } from './imagesUpload.validation';

const router: Router = Router();

router.post(
  '/upload/company_logo/:company_id',
  [
    validatePermissions(allowedEntities.COMPANY),
    uploadCompany.single('image'),
    isValidRequestFormat,
  ],
  setCompanyImage,
);

router.post(
  '/upload/service/:service_id',
  [
    validatePermissions(allowedEntities.COMPANY),
    uploadService.single('image'),
    isValidRequestFormat,
  ],
  setServiceImage,
);

router.post(
  '/upload/news/:news_id',
  [
    validatePermissions(allowedEntities.ADMIN),
    uploadNews.single('image'),
    isValidRequestFormat,
  ],
  setNewsImage,
);

router.post(
  '/delete/company_logo/:company_id',
  [validatePermissions(allowedEntities.COMPANY)],
  deleteCompanyLogo,
);

router.post(
  '/delete/service/:service_id',
  [validatePermissions(allowedEntities.COMPANY)],
  deleteServiceImage,
);

router.post(
  '/delete/news/:news_id',
  [validatePermissions(allowedEntities.ADMIN)],
  deleteNewsImage,
);

export default router;
