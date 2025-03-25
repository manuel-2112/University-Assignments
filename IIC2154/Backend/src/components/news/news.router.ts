import { Router } from 'express';
import {
  validateStructure,
  validatePermissions,
} from '@core/middlewares/validate.middleware';
import { AllowedEntities as allowedEntities } from '@components/authentication/entities.enum';
import apiKey from '@core/middlewares/apiKey.middleware';
import { createNewsValidation, updateNewsValidation } from './news.validation';
import {
  createNews,
  readNewsById,
  readAllNews,
  readVisibleNews,
  readHiddenNews,
  updateNewsById,
  deleteNewsById,
} from './news.controller';

const router: Router = Router();

router.get(
  '/news/all',
  validatePermissions(allowedEntities.ADMIN),
  readAllNews,
);
router.get('/news/visible', readVisibleNews);
router.get(
  '/news/hidden',
  validatePermissions(allowedEntities.ADMIN),
  readHiddenNews,
);

router.get('/news/:id', readNewsById);

// router.post('/news', [validatePermissions(allowedEntities.ADMIN), validateStructure(createNewsValidation)], createNews);
router.post(
  '/news',
  [validateStructure(createNewsValidation), apiKey],
  createNews,
);
router.put(
  '/news/:id',
  [
    validatePermissions(allowedEntities.ADMIN),
    validateStructure(updateNewsValidation),
  ],
  updateNewsById,
);

router.delete(
  '/news/:id',
  validatePermissions(allowedEntities.ADMIN),
  deleteNewsById,
);

export default router;
