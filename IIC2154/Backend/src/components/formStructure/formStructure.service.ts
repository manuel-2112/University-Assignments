/**
 * Service for form structure operations.
 */

import httpStatus from 'http-status';
import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';
import CompanyModel from '@components/company/company.model';
import { IFormStructure } from './formStructure.interface';

/**
 * Retrieves the form structure for a given company.
 * @param companyId - The ID of the company.
 * @returns A promise that resolves to the form structure of the company.
 * @throws {AppError} If there is an error retrieving the form structure.
 */
export const readFormStructure = async (
  companyId: string,
): Promise<IFormStructure> => {
  try {
    const company = await CompanyModel.findOne({ _id: companyId });
    logger.debug(`Sent formStructure where company.id: ${companyId}`);
    return company.formStructure;
  } catch (err) {
    logger.error(`Company read formStructure err: %O`, err.message);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Could not send Company form structure',
    );
  }
};

/**
 * Creates a form structure for a company.
 * @param formStructure - The form structure to be created.
 * @param id - The ID of the company.
 * @returns The created form structure.
 * @throws AppError if the form structure could not be created.
 */
export const createFormStructure = async (
  formStructure: IFormStructure,
  id: string,
): Promise<IFormStructure> => {
  try {
    const company = await CompanyModel.findOne({ _id: id });
    company.formStructure = formStructure;
    await company.save();
    logger.debug(`Created formStructure where company.id: ${id}`);
    return company.formStructure;
  } catch (err) {
    logger.error(`Company create formStructure err: %O`, err.message);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Could not create Company form structure',
    );
  }
};

/**
 * Deletes the form structure of a company.
 * @param id - The ID of the company.
 * @returns A promise that resolves to a boolean indicating whether the form structure was successfully deleted.
 * @throws {AppError} If there is an error deleting the form structure.
 */
export const deleteFormStructure = async (id: string): Promise<boolean> => {
  try {
    const updatedCompany = await CompanyModel.findOneAndUpdate(
      { _id: id },
      { $unset: { formStructure: {} } },
      { new: true },
    );
    updatedCompany.save();
    logger.debug(`Deleted formStructure where company.id: ${id}`);
    return true;
  } catch (err) {
    logger.error(`Company delete formStructure err: %O`, err.message);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Could not delete Company form structure',
    );
  }
};
