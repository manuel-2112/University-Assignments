import { Router } from 'express';
import { validateStructure } from '@core/middlewares/validate.middleware';
import {
  createUserValidation,
  createPotentialUserValidation,
  updateUserDisplayDataValidation,
  updateUserStatusValidation,
  updateOwnershipValidation,
  priviligedUpdateOwnershipValidation as privilegedUpdateOwnershipValidation,
} from './user.validation';
import {
  createUser,
  getUserFavoriteCompanies,
  addCompanyToUserFavorites,
  removeCompanyToUserFavorites,
  createPotentialUser,
  getUser,
  getPotentialUsers,
  updateUserDisplayData,
  updateUserStatus,
  claimCompany,
  allowCompanyOwnership,
  privilegedAllowCompanyOwnership,
  denyCompanyOwnership,
  privilegedDenyCompanyOwnership,
  getOwnershipClaims,
  getClaimingUsersOfCompany,
  getOwnersOfCompany,
  getClaimedCompanies,
  getOwnedCompanies,
} from './user.controller';

const router: Router = Router();

router.post('/users', validateStructure(createUserValidation), createUser);

router.get('/users/:user_id/favorites', getUserFavoriteCompanies);

router.post('/users/:user_id/favorites/:company_id', addCompanyToUserFavorites);

router.delete(
  '/users/:user_id/favorites/:company_id',
  removeCompanyToUserFavorites,
);

router.get(
  // Must go before '/users/:user_id' or pending will be treated as an id
  '/users/pending',
  getPotentialUsers,
);

router.get('/users/:user_id', getUser);

router.post(
  '/users/:user_id/join',
  validateStructure(createPotentialUserValidation),
  createPotentialUser,
);

router.patch(
  '/users/:user_id',
  validateStructure(updateUserDisplayDataValidation),
  updateUserDisplayData,
);

router.patch(
  '/users/:user_id/status',
  validateStructure(updateUserStatusValidation),
  updateUserStatus,
);

router.post('/claims/:company_id/users/:user_id', claimCompany);

router.post(
  '/ownerships/:company_id/users/:user_id',
  validateStructure(updateOwnershipValidation),
  allowCompanyOwnership,
);

router.post(
  '/ownerships/:company_id/users/:user_id/admin',
  validateStructure(privilegedUpdateOwnershipValidation),
  privilegedAllowCompanyOwnership,
);

router.delete(
  '/claims/:company_id/users/:user_id',
  validateStructure(updateOwnershipValidation),
  denyCompanyOwnership,
);

router.delete(
  '/claims/:company_id/users/:user_id/admin',
  validateStructure(privilegedUpdateOwnershipValidation),
  privilegedDenyCompanyOwnership,
);

router.get('/claims', getOwnershipClaims);

router.get('/claims/:company_id', getClaimingUsersOfCompany);

router.get('/ownerships/:company_id', getOwnersOfCompany);

router.get('/users/:user_id/claims', getClaimedCompanies);

router.get('/users/:user_id/ownerships', getOwnedCompanies);

export default router;
