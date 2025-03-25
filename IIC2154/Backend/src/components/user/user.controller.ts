/**
 * This module contains the controller of the user entity.
 */

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ICompany } from '@components/company/company.interface';
import CompanyModel from '@components/company/company.model';
import {
  create,
  getFavoriteCompanies,
  addFavoriteCompany,
  removeFavoriteCompany,
  setDisplayData,
  setRole,
  setStatus,
  addClaim,
  removeClaim,
  addOwnership,
} from './user.service';
import { IUser, IDisplayData } from './user.interface';
import UserModel from './user.model';
import { Status } from './status.enum';

/**
 * Create user
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Confirmation message and created user
 * @throws If internal server error or user already existed
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const receivedSubId = req.body.user_id;
    const user: IUser = await UserModel.findOne({
      user_id: receivedSubId,
    });
    if (!user) {
      const userData = req.body as IUser;
      const createdUser = await create(userData);
      res.status(httpStatus.CREATED);
      return res.send({
        message: 'User was created successfully',
        user: createdUser,
      });
    }
    res.status(httpStatus.BAD_REQUEST);
    return res.send({ message: 'User already existed' });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Fetch user favorite companies
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Array of user's favorite companies
 * @throws If internal server error or user does not exist
 */
export const getUserFavoriteCompanies = async (req: Request, res: Response) => {
  try {
    const subId = req.params.user_id;
    const user: IUser = await UserModel.findOne({
      user_id: subId,
    });
    if (!user) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'User does not exist' });
    }
    const favoriteCompanies: ICompany[] = await getFavoriteCompanies(subId);
    res.status(httpStatus.OK);
    res.send(favoriteCompanies);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Add company to user favorites
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Confirmation message
 * @throws If internal server error
 */
export const addCompanyToUserFavorites = async (
  req: Request,
  res: Response,
) => {
  try {
    const subId = req.params.user_id;
    const companyId = req.params.company_id;
    await addFavoriteCompany(subId, companyId);
    res.status(httpStatus.OK);
    res.send({ message: 'Added Favorite Company' });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Remove company from user favorites
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Confirmation message
 * @throws If internal server error
 */
export const removeCompanyToUserFavorites = async (
  req: Request,
  res: Response,
) => {
  try {
    const subId = req.params.user_id;
    const companyId = req.params.company_id;
    await removeFavoriteCompany(subId, companyId);
    res.status(httpStatus.OK);
    res.send({ message: 'Removed Favorite Company' });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Fetch User
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns User
 * @throws If internal server error or user not found
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const user = await UserModel.findOne({ user_id: userId });
    if (!user) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'User does not exist' });
    }
    res.status(httpStatus.OK).send(user);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Creates potential user
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns User
 * @throws If internal server error, user not found or status is not NONE
 */
export const createPotentialUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const displayData = req.body.displayData as IDisplayData;
    const role = req.body.role;

    const user = await UserModel.findOne({ user_id: userId });
    if (!user) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'User does not exist' });
    }
    if (user.status !== Status.NONE) {
      res.status(httpStatus.BAD_REQUEST);
      return res.send({ message: 'User already submitted application' });
    }

    await setStatus(user, Status.PENDING);
    await setRole(user, role);
    await setDisplayData(user, displayData);

    res.status(httpStatus.OK);
    res.send(user);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Fetches Potential Users
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Potential Users
 * @throws If internal server error
 */
export const getPotentialUsers = async (req: Request, res: Response) => {
  try {
    const potentialUserCondition = { status: Status.PENDING };
    const potentialUsers = await UserModel.find(potentialUserCondition);
    res.status(httpStatus.OK).send(potentialUsers);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Updates user's display data
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns User
 * @throws If internal server error, user not found or user has not sent application
 */
export const updateUserDisplayData = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const displayData = req.body.displayData as IDisplayData;

    const user = await UserModel.findOne({ user_id: userId });
    if (!user) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'User does not exist' });
    }
    if (user.status === Status.NONE) {
      res.status(httpStatus.BAD_REQUEST);
      return res.send({ message: 'User must first submit application' });
    }

    await setDisplayData(user, displayData);

    res.status(httpStatus.OK);
    res.send(user);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Updates user's status
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns User
 * @throws If internal server error, user not found, new status is not valid, or user status is not pending
 */
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const newStatus = req.body.status;

    if (newStatus === Status.PENDING || newStatus === Status.NONE) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'New Status must be Accepted or Denied' });
    }

    const user = await UserModel.findOne({ user_id: userId });
    if (!user) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'User does not exist' });
    }
    if (user.status !== Status.PENDING) {
      res.status(httpStatus.BAD_REQUEST);
      return res.send({ message: 'User status must be pending' });
    }

    await setStatus(user, newStatus);

    res.status(httpStatus.OK);
    res.send(user);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Sets User's ownership to the requested company
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns User
 * @throws If server error, user not found, no valid ownership or company not found
 */
export const claimCompany = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const companyId = req.params.company_id;

    const user = await UserModel.findOne({ user_id: userId });
    if (!user) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'User does not exist' });
    }
    if (user.status === Status.NONE) {
      res.status(httpStatus.BAD_REQUEST);
      return res.send({ message: 'User must first submit application' });
    }
    if (
      user.claimedCompanies.includes(companyId) ||
      user.ownedCompanies.includes(companyId)
    ) {
      res.status(httpStatus.BAD_REQUEST);
      return res.send({
        message: 'User already claimed or owned this Company',
      });
    }

    const company = await CompanyModel.findById(companyId);
    if (!company) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'Company does not exist' });
    }

    await addClaim(user, companyId);

    res.status(httpStatus.OK);
    res.send(user);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Privileged allow of a user's ownership claim
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns User
 * @throws If internal server error, user not found, company not found
 */
export const privilegedAllowCompanyOwnership = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.params.user_id;
    const companyId = req.params.company_id;

    const user = await UserModel.findOne({ user_id: userId });
    if (!user) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'User does not exist' });
    }
    if (!user.claimedCompanies.includes(companyId)) {
      res.status(httpStatus.BAD_REQUEST);
      return res.send({ message: 'User has not claimed the company' });
    }
    if (user.ownedCompanies.includes(companyId)) {
      res.status(httpStatus.BAD_REQUEST);
      return res.send({ message: 'User already owns the company' });
    }

    const company = await CompanyModel.findById(companyId);
    if (!company) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'Company does not exist' });
    }

    await removeClaim(user, companyId);
    await addOwnership(user, companyId);

    res.status(httpStatus.OK);
    res.send(user);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Updates user's status by company owner
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns User
 * @throws If internal server error, user not found, new status/old is not valid, owner or company not valid
 */
export const allowCompanyOwnership = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.company_id;
    const ownerId = req.body.user_id;

    const owner = await UserModel.findOne({ user_id: ownerId });
    if (!owner) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'Supposed Owner does not exist' });
    }
    if (!owner.ownedCompanies.includes(companyId)) {
      res.status(httpStatus.BAD_REQUEST);
      return res.send({ message: 'Supposed Owner does not own the company' });
    }

    await privilegedAllowCompanyOwnership(req, res);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Privileged deny of a user's ownership claim
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns User
 * @throws If internal server error, user not found, company not found
 */
export const privilegedDenyCompanyOwnership = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.params.user_id;
    const companyId = req.params.company_id;

    const user = await UserModel.findOne({ user_id: userId });
    if (!user) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'User does not exist' });
    }
    if (!user.claimedCompanies.includes(companyId)) {
      res.status(httpStatus.BAD_REQUEST);
      return res.send({ message: 'User has not claimed the company' });
    }
    if (user.ownedCompanies.includes(companyId)) {
      res.status(httpStatus.BAD_REQUEST);
      return res.send({ message: 'User already owns the company' });
    }

    const company = await CompanyModel.findById(companyId);
    if (!company) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'Company does not exist' });
    }

    await removeClaim(user, companyId);

    res.status(httpStatus.OK);
    res.send(user);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Deny user's claim by owner
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns User
 * @throws If internal server error, user not found
 */
export const denyCompanyOwnership = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.company_id;
    const ownerId = req.body.user_id;

    const owner = await UserModel.findOne({ user_id: ownerId });
    if (!owner) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'Supposed Owner does not exist' });
    }
    if (!owner.ownedCompanies.includes(companyId)) {
      res.status(httpStatus.BAD_REQUEST);
      return res.send({ message: 'Supposed Owner does not own the company' });
    }

    await privilegedDenyCompanyOwnership(req, res);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Get all claims
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns list of company's names and id, with the users with claims
 * @throws If internal server error
 */
export const getOwnershipClaims = async (req: Request, res: Response) => {
  try {
    const companies = await CompanyModel.find({});

    const users = await UserModel.find({
      claimedCompanies: { $exists: true, $ne: [] },
    });
    const response = [];

    companies.forEach((company) => {
      const companyUsers = users.filter((user) =>
        user.claimedCompanies.includes(company._id.toString()),
      );

      if (companyUsers.length > 0) {
        response.push({
          companyId: company._id,
          name: company.accountData.name,
          users: companyUsers,
        });
      }
    });
    res.status(httpStatus.OK).send(response);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Get company claims
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns users with claims of the company
 * @throws If internal server error or company does not exist
 */
export const getClaimingUsersOfCompany = async (
  req: Request,
  res: Response,
) => {
  try {
    const companyId = req.params.company_id;
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'Company does not exist' });
    }

    const claimingCondition = { claimedCompanies: companyId };
    const claimingUsers = await UserModel.find(claimingCondition);
    res.status(httpStatus.OK).send(claimingUsers);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

/**
 * Get company owners
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns owners of the company
 * @throws If internal server error or company does not exist
 */
export const getOwnersOfCompany = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.company_id;
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'Company does not exist' });
    }

    const ownerCondition = { ownedCompanies: companyId };
    const owners = await UserModel.find(ownerCondition);
    res.status(httpStatus.OK).send(owners);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
  return res;
};

export const getClaimedCompanies = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;

    const user = await UserModel.findOne({ user_id: userId });
    if (!user) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'User does not exist' });
    }

    const claimedCompaniesIds = user.claimedCompanies;
    const claimedCompanies = await CompanyModel.find({
      _id: { $in: claimedCompaniesIds },
    });
    return res.status(httpStatus.OK).send(claimedCompanies);
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

export const getOwnedCompanies = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;

    const user = await UserModel.findOne({ user_id: userId });
    if (!user) {
      res.status(httpStatus.NOT_FOUND);
      return res.send({ message: 'User does not exist' });
    }

    const ownedCompaniesIds = user.ownedCompanies;
    const ownedCompanies = await CompanyModel.find({
      _id: { $in: ownedCompaniesIds },
    });
    return res.status(httpStatus.OK).send(ownedCompanies);
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};
