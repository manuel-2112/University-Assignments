/**
 * Service for form data operations.
 */

import httpStatus from 'http-status';
import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';
import {
  addFormDataToCompany,
  sendRequestServiceEmail,
} from '@components/company/company.service';
import { IFormStructure } from '@components/formStructure/formStructure.interface';
import FormDataModel from './formData.model';
import { IFormData } from './formData.interface';

/**
 * Retrieves the structure fields from the given data object based on the provided form structure.
 *
 * @param data - The data object containing the form data.
 * @param structure - The form structure object defining the fields.
 * @returns A new object containing only the structure fields from the data object.
 */
const getStructureFields = (data: IFormData, structure: IFormStructure) => {
  const newData = {
    _id: data._id,
    companyId: data.companyId,
  };
  /* eslint-disable security/detect-object-injection */
  Object.keys(structure).map((key) => {
    if (structure[key]) {
      newData[key] = data[key];
    }
    return null; // Add a return statement to the arrow function
  });
  /* eslint-enable security/detect-object-injection */
  return newData as IFormData;
};

/**
 * Creates a new form data entry.
 *
 * @param formData - The data for the form entry.
 * @param formStructure - The structure of the form.
 * @returns A promise that resolves to the created form data entry.
 * @throws {AppError} If the form was not created.
 */
export const create = async (
  formData: IFormData,
  formStructure: IFormStructure,
): Promise<IFormData> => {
  try {
    let newFormData: IFormData = await FormDataModel.create(formData);
    newFormData = getStructureFields(newFormData, formStructure);
    await addFormDataToCompany(newFormData.companyId, newFormData._id);
    await sendRequestServiceEmail(newFormData);
    logger.debug(`FormData created: %O`, newFormData);
    return newFormData;
  } catch (err) {
    logger.error(`FormData create err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Form was not created!');
  }
};

/**
 * Retrieves a specific form data by its ID.
 * @param formDataId - The ID of the form data to retrieve.
 * @returns A Promise that resolves to the retrieved form data.
 * @throws Error if the form data with the specified ID is not found.
 */
export const read = async (formDataId: string): Promise<IFormData> => {
  logger.debug(`Sent formData.id ${formDataId}`);
  const formData = await FormDataModel.findById(formDataId);
  if (!formData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Form data not found');
  }
  return formData as IFormData;
};

/**
 * Retrieves all form data from the database.
 * @returns A promise that resolves to an array of IFormData objects.
 */
export const getAll = async (): Promise<IFormData[]> => {
  const formsData = await FormDataModel.find();
  logger.debug(`Sent all formData`);
  return formsData as IFormData[];
};

/**
 * Retrieves forms data for a given company ID.
 * @param companyId - The ID of the company.
 * @returns A promise that resolves to an array of form data.
 * @throws {AppError} If the form data cannot be retrieved.
 */
export const getFormsData = async (companyId: string): Promise<IFormData[]> => {
  try {
    const formsData = await FormDataModel.find({ companyId });
    return formsData;
  } catch (err) {
    logger.error(`FormData get err: %O`, err.message);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Form was not able to be retrieved!',
    );
  }
};
