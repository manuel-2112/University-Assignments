import { Router } from 'express';
// import protectedByApiKey from '@core/middlewares/apiKey.middleware';
import {
  validateStructure,
  validatePermissions,
} from '@core/middlewares/validate.middleware';
import { createFormDataValidation } from '@components/formData/formData.validation';
import { AllowedEntities as allowedEntities } from '@components/authentication/entities.enum';
import {
  createFormData,
  getAllFormData,
  getCompanyFormsData,
  readFormData,
} from '@components/formData/formData.controller';
import {
  createCompany,
  readCompany,
  getAllCompanies,
  getAllUnverifiedCompanies,
  deleteCompany,
  privilegedUpdateCompany,
  updateCompany,
  verifyCompany,
  loginCompany,
} from './company.controller';
import {
  createCompanyValidation,
  loginCompanyValidation,
  priviligedUpdateCompanyValidation,
  updateCompanyValidation,
  verifyCompanyValidation,
} from './company.validation';
import {
  createServiceValidation,
  updateServiceValidation,
} from '../services/services.validation';
import {
  createService,
  getAllServices,
  getCompanyServices,
  readService,
  updateService,
  deleteService,
} from '../services/services.controller';
import { createFormStructureValidation } from '../formStructure/formStructure.validation';
import {
  readCompanyFormStructure,
  createCompanyFormStructure,
  deleteCompanyFormStructure,
} from '../formStructure/formStructure.controller';

const router: Router = Router();

// All
router.post(
  '/companies',
  validateStructure(createCompanyValidation),
  createCompany,
);

// All
router.post(
  '/companies/login',
  validateStructure(loginCompanyValidation),
  loginCompany,
);

// Company - Admin
router.post(
  '/companies/:company_id/services',
  [
    validatePermissions(allowedEntities.COMPANY),
    validateStructure(createServiceValidation),
  ],
  createService,
);
// Company - Admin
router.post(
  '/companies/:company_id/form_structure',
  [
    validatePermissions(allowedEntities.COMPANY),
    validateStructure(createFormStructureValidation),
  ],
  createCompanyFormStructure,
);
// All
router.post(
  '/companies/:company_id/form_data',
  validateStructure(createFormDataValidation),
  createFormData,
);

// All
router.get('/companies/', getAllCompanies);
// All
router.get('/companies/services', getAllServices);
// Admin
router.get(
  '/companies/unverified',
  validatePermissions(allowedEntities.ADMIN),
  getAllUnverifiedCompanies,
);
// Admin
router.get(
  '/companies/form_data',
  validatePermissions(allowedEntities.ADMIN),
  getAllFormData,
);
// All
router.get('/companies/:company_id', readCompany);
// All
router.get('/companies/:company_id/services', getCompanyServices);
// All
router.get('/companies/:company_id/services/:service_id', readService);
// All
router.get('/companies/:company_id/form_structure', readCompanyFormStructure);

// Admin
router.get(
  '/companies/:company_id/form_data/:form_data_id',
  validatePermissions(allowedEntities.ADMIN),
  readFormData,
);
// Admin
router.get(
  '/companies/:company_id/form_data',
  validatePermissions(allowedEntities.ADMIN),
  getCompanyFormsData,
);

// Priviliged Update
router.put(
  '/companies/:company_id',
  validateStructure(priviligedUpdateCompanyValidation),
  privilegedUpdateCompany,
);

router.put(
  '/companies/:company_id/owner',
  validateStructure(updateCompanyValidation),
  updateCompany,
);

// Admin
router.put(
  '/companies/:company_id/verified',
  [
    validatePermissions(allowedEntities.ADMIN),
    validateStructure(verifyCompanyValidation),
  ],
  verifyCompany,
);

// Company - Admin
router.put(
  '/companies/:company_id/services/:service_id',
  [
    validatePermissions(allowedEntities.COMPANY),
    validateStructure(updateServiceValidation),
  ],
  updateService,
);

// Company - Admin
router.delete(
  '/companies/:company_id',
  validatePermissions(allowedEntities.COMPANY),
  deleteCompany,
);
// Company - Admin
router.delete(
  '/companies/:company_id/services/:service_id',
  validatePermissions(allowedEntities.COMPANY),
  deleteService,
);
// Company - Admin
router.delete(
  '/companies/:company_id/form_structure',
  validatePermissions(allowedEntities.COMPANY),
  deleteCompanyFormStructure,
);

export default router;
