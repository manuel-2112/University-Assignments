/**
 * This module contains the db operations of user entity
 */

import { ICompany } from '@components/company/company.interface';
import CompanyModel from '@components/company/company.model';

import logger from '@core/utils/logger';
import httpStatus from 'http-status';
import AppError from '@core/utils/appError';
import { IUser, IDisplayData } from './user.interface';
import UserModel from './user.model';

/**
 * Creates a new user.
 * @param user The user object to create.
 * @returns Promise<IUser> Newly created user.
 * @throws AppError If there's an error creating the user.
 */
export const create = async (user: IUser): Promise<IUser> => {
  try {
    const newUser = await UserModel.create(user);
    logger.debug(`User created: %O`, newUser);
    return newUser;
  } catch (err) {
    logger.error(`User create err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'User was not created!');
  }
};

/**
 * Fetches user's favorite companies
 * @param user_id The Auth0's user_id
 * @returns Promise<ICompany[]> Array of the favorite companies of user
 * @throws AppError If there's an error fetching the companies
 */
export const getFavoriteCompanies = async (
  user_id: string,
): Promise<ICompany[]> => {
  try {
    const user = await UserModel.findOne({ user_id });
    const favoriteCompanyIds = user.favoriteCompanies;
    const favoriteCompanies = await CompanyModel.find({
      _id: { $in: favoriteCompanyIds },
    });
    return favoriteCompanies;
  } catch (err) {
    logger.error(`Fetch favorite companies for user err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Companies were not retrieved!');
  }
};

/**
 * Add company to user favorites
 * @param user_id The Auth0's user_id
 * @param companyId The newly favorited company's id
 * @throws AppError If company doesn't exist, nor the user, or if company is already in favorites
 */
export const addFavoriteCompany = async (
  user_id: string,
  companyId: string,
) => {
  try {
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      throw new AppError(httpStatus.NOT_FOUND, 'Company does not exist');
    }
    const user = await UserModel.findOne({ user_id });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    if (user.favoriteCompanies.includes(companyId)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Company is already in User favorites',
      );
    }
    user.favoriteCompanies.push(companyId);
    await user.save();
  } catch (err) {
    logger.error(`Add favorite company err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Favorite company not added!');
  }
};

/**
 * Remove company from user favorites
 * @param user_id The Auth0's user_id
 * @param companyId The recently removed company's id
 * @throws AppError If company doesn't exist, nor the user, or if company is not in favorites
 */
export const removeFavoriteCompany = async (
  user_id: string,
  companyId: string,
) => {
  try {
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      throw new AppError(httpStatus.NOT_FOUND, 'Company does not exist');
    }
    const user = await UserModel.findOne({ user_id });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const index = user.favoriteCompanies.indexOf(companyId);
    if (index === -1) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Company is not in User favorites',
      );
    }
    user.favoriteCompanies.splice(index, 1);
    await user.save();
  } catch (err) {
    logger.error(`Remove favorite company err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Favorite company not removed!');
  }
};

/**
 * Adds or Updates user's display data
 * @param user The user
 * @param displayData New display data
 * @throws if validation error
 */
export const setDisplayData = async (user, displayData: IDisplayData) => {
  try {
    const userToUpdate = user;
    userToUpdate.displayData = displayData;
    await userToUpdate.save();
  } catch (err) {
    logger.error(`Display Data update error: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Display data not updated!');
  }
};

/**
 * Adds user's role
 * @param user The user
 * @param newRole New role
 * @throws if validation error
 */
export const setRole = async (user, newRole: String) => {
  try {
    const userToUpdate = user;
    userToUpdate.role = newRole;
    await userToUpdate.save();
  } catch (err) {
    logger.error(`Role set error: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Role not set!');
  }
};

/**
 * Updates user's status
 * @param user The user
 * @param newStatus New status
 * @throws if validation error
 */
export const setStatus = async (user, newStatus: String) => {
  try {
    const userToUpdate = user;
    userToUpdate.status = newStatus;
    await userToUpdate.save();
  } catch (err) {
    logger.error(`Status set error: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Status not set!');
  }
};

/**
 * Add new company to claimed array
 * @param user The user
 * @param companyId Company to-be claimed
 * @throws if validation error
 */
export const addClaim = async (user, companyId: String) => {
  try {
    const userToUpdate = user;
    userToUpdate.claimedCompanies.push(companyId);
    await userToUpdate.save();
  } catch (err) {
    logger.error(`Status set error: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Claimed company not added!');
  }
};

/**
 * Remove company from claimed array
 * @param user The user
 * @param companyId Company to-be unclaimed
 * @throws if validation error
 */
export const removeClaim = async (user, companyId: String) => {
  try {
    const userToUpdate = user;
    const index = userToUpdate.claimedCompanies.indexOf(companyId);
    userToUpdate.claimedCompanies.splice(index, 1);
    await userToUpdate.save();
  } catch (err) {
    logger.error(`Status set error: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Claimed company not removed!');
  }
};

/**
 * Add new company to owned array
 * @param user The user
 * @param companyId Company to-be owned
 * @throws if validation error
 */
export const addOwnership = async (user, companyId: String) => {
  try {
    const userToUpdate = user;
    userToUpdate.ownedCompanies.push(companyId);
    await userToUpdate.save();
  } catch (err) {
    logger.error(`Status set error: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Owned company not added!');
  }
};
