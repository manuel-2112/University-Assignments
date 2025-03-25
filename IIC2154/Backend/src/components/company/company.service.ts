/**
 * This module contains the service related function for a company, such as creating,
 * adding a logo, updating, deleting, verifying, and sending emails.
 */
import httpStatus from 'http-status';
import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';
import CompanyModel from '@components/company/company.model';
import { ICompany, IAccountData } from '@components/company/company.interface';
import { buildFieldsToUpdate } from '@core/utils/companyDataManagement';
import ServiceModel from '@components/services/services.model';
import { getServices } from '@components/services/services.service';
import mailCompany from '@components/mail/mail.company';
import { MailCases } from '@components/mail/mail.enum';
import mailAdmin from '@components/mail/mail.admin';
import { IFormData } from '@components/formData/formData.interface';
import config from '@config/config';

/**
 * Create a new company
  * @param data - Company data that contains the following attributes:
    name: string;
    email: string;
    rut: string;
    logo: string;
    address: string;
    city: string;
    region: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
    instagramUrl: string;
    linkedinUrl: string;  
    webpageUrl: string;
    branchRegions: string[]
  * @returns The created company
  * @throws {AppError} - If company was not created
  */
export const create = async (data: IAccountData): Promise<ICompany> => {
  try {
    const newCompany = await CompanyModel.create({ accountData: data });
    logger.debug(`Company created: %O`, newCompany);
    return newCompany;
  } catch (err) {
    logger.error(`Company create err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Company was not created!');
  }
};

/**
 * Find a company through its id
 * @param companyId - Company id
 * @returns The company found with the corresponding services
 * @throws {AppError} - If company was not found
 */
export const read = async (companyId: string): Promise<ICompany> => {
  logger.debug(`Sent company.id ${companyId}`);
  const company = await CompanyModel.findOne({
    _id: companyId,
  });

  if (!company) {
    throw Error('Company not found');
  }
  const companyServices = await getServices(company._id);
  company.servicesData = companyServices;
  return company as ICompany;
};

/**
 * Find all companies
 * @returns All companies that are verified and not superusers
 */
export const getAll = async (): Promise<ICompany[]> => {
  logger.debug(`Sent all companies`);
  const companies = await CompanyModel.find(
    {
      'permissions.isVerified': true,
      'permissions.isSuperuser': false,
    },
    'accountData permissions',
  );
  return companies as ICompany[];
};

/**
 * Find all unverified companies
 * @returns All companies that are not verified
 */
export const getAllUnverified = async (): Promise<ICompany[]> => {
  logger.debug(`Sent all unverified companies`);
  const companies = await CompanyModel.find(
    {
      'permissions.isVerified': false,
    },
    'accountData permissions',
  );
  return companies as ICompany[];
};

/**
 * Update a company through its id
 * @param data - Company data that contains the following attributes:
 * @returns The updated company
 * @throws {AppError} - If company was not updated
 */
export const update = async (
  data: IAccountData,
  companyId: string,
): Promise<ICompany> => {
  try {
    const fieldsToUpdate = buildFieldsToUpdate(data, 'accountData');
    const updatedCompany = await CompanyModel.findOneAndUpdate(
      { _id: companyId },
      { $set: fieldsToUpdate },
      { new: true },
    );
    if (!updatedCompany) {
      throw Error('Company not found');
    }
    logger.debug(`Company updated: %O`, updatedCompany);
    return updatedCompany;
  } catch (err) {
    logger.error(`Company update err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Company was not updated!');
  }
};

/**
 * Delete a company through its id
 * @param companyId - Company id
 * @returns True if company was deleted
 * @throws {AppError} - If company was not deleted
 */
export const deleteById = async (companyId: string): Promise<boolean> => {
  try {
    await ServiceModel.deleteMany({ companyId });
    const deletedCompany = await CompanyModel.findByIdAndDelete(companyId);
    if (!deletedCompany) {
      throw Error('Company not found');
    }
    logger.debug(`Company ${companyId} has been removed`);
    return true;
  } catch (err) {
    logger.error(`Company delete err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Company was not deleted!');
  }
};

/**
 * Send a verification email to a company
 * @param companyName - Company name
 * @param companyEmail - Company email
 * @throws {AppError} - If email was not sent
 */
export const sendVerificationEmail = async (
  isVerified: boolean,
  companyName: string,
  companyEmail: string,
) => {
  const mailCase: MailCases = isVerified
    ? MailCases.VERIFIED_COMPANY
    : MailCases.REJECTED_COMPANY;
  await mailCompany(mailCase, companyName, companyEmail, '');
};

/**
 * Verify a company through its id
 * @param isVerified - Boolean that indicates if the company is verified
 * @param companyId - Company id
 * @returns True if company was verified
 * @throws {AppError} - If company was not verified
 */
export const verifyCompanyById = async (
  isVerified: boolean,
  companyId: string,
): Promise<boolean> => {
  try {
    const updatedCompany = await CompanyModel.findOneAndUpdate(
      { _id: companyId },
      { $set: { 'permissions.isVerified': isVerified } },
      { new: true },
    );
    if (!updatedCompany) {
      throw Error('Company not found');
    }
    logger.debug(`Company verified status updated: %O`, updatedCompany);

    const companyName = updatedCompany.accountData.name;
    const companyEmail = updatedCompany.accountData.email;
    await sendVerificationEmail(isVerified, companyName, companyEmail);
    return true;
  } catch (err) {
    logger.error(`Company verify err: %O`, err.message);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Company verified status was not updated!',
    );
  }
};

/**
 * Add a service to a company
 * @param companyId - Company id
 * @param serviceId - Service id
 * @returns True if service was added
 * @throws {AppError} - If service was not added
 */
export const addServiceToCompany = async (
  companyId: string,
  serviceId: string,
): Promise<boolean> => {
  try {
    await CompanyModel.findByIdAndUpdate(
      companyId,
      { $push: { servicesData: serviceId } },
      { new: true },
    );
    logger.debug(`Added service ${serviceId} to Company ${companyId}`);
    return true;
  } catch (err) {
    logger.error(`Service addition err: %O`, err.message);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Service was not added to Company!',
    );
  }
};

/**
 * Add a form data to a company
 * @param companyId - Company id
 * @param formDataId - Form data id
 * @returns True if form data was added
 * @throws {AppError} - If form data was not added
 */
export const addFormDataToCompany = async (
  companyId: string,
  formDataId: string,
): Promise<boolean> => {
  try {
    await CompanyModel.findByIdAndUpdate(
      companyId,
      { $push: { formsData: formDataId } },
      { new: true },
    );
    logger.debug(`Added formData ${formDataId} to Company ${companyId}`);
    return true;
  } catch (err) {
    logger.error(`FormData addition err: %O`, err.message);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Form was not added to Company!',
    );
  }
};

/**
 * Remove a service from a company
 * @param companyId - Company id
 * @param serviceId - Service id
 * @returns True if service was removed
 * @throws {AppError} - If service was not removed
 */
export const deleteServiceFromCompany = async (
  companyId: string,
  serviceId: string,
): Promise<boolean> => {
  try {
    const company = await CompanyModel.findById(companyId);
    company.servicesData = company.servicesData.filter(
      (id) => id.toString() !== serviceId,
    );
    await company.save();
    return true;
  } catch (err) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Service was not removed from Company!',
    );
  }
};

/**
 * Send a request service email to a company
  * @param formData - Form data that contains the following attributes:
      companyId: string;
      email: string;
      name: string;
      phone: string;
      service: string;
      description: string;
    * @throws {AppError} - If email was not sent
    */
export const sendRequestServiceEmail = async (formData: IFormData) => {
  const company = await CompanyModel.findById(formData.companyId);

  await mailCompany(
    MailCases.REQUESTED_SERVICE,
    company.accountData.name,
    company.accountData.email,
    JSON.stringify(formData),
  );
};

/**
 * Add a logo to a company
 * @param companyId - Company id
 * @param logo - Logo url
 * @returns True if logo was added
 * @throws {AppError} - If logo was not added
 */

export const addLogo = async (companyId: string, logo: string) => {
  await CompanyModel.findByIdAndUpdate(
    companyId,
    { $set: { 'accountData.logo': logo } },
    { new: true },
  );
  logger.debug(`Added logo to Company ${companyId}`);
  return true;
};

/**
 * Send a registration email to a company
 * @param companyName - Company name
 * @param companyEmail - Company email
 * @throws {AppError} - If email was not sent
 */
export const sendRegistrationEmail = async (
  companyName: string,
  companyEmail: string,
) => {
  // Sending email to admin to inform that a new company is waiting to be verified
  await mailAdmin(companyName);

  // Sending email to startup to inform that the account is being verified
  await mailCompany(MailCases.WAITING_COMPANY, companyName, companyEmail, '');
};

/**
 * Delete a logo from a company
 * @param companyId - Company id
 * @param logoUrl - Logo url
 * @returns True if logo was deleted
 * @throws {AppError} - If logo was not deleted
 */
export const deleteLogo = async (companyId: string, logoUrl: string) => {
  try {
    const logoUrlSplit: string[] = logoUrl.split('/').slice(-2);
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      throw Error('Company not found');
    }
    const companyLogoSplit: string[] = company.accountData.logo
      ?.split('/')
      .slice(-2);
    const equal: boolean = logoUrlSplit.every(
      /* eslint-disable-next-line security/detect-object-injection */
      (el, idx) => el === companyLogoSplit[idx],
    );
    if (equal) {
      company.accountData.logo = config.default_company_logo;
      await company.save();
      logger.debug(`Logo deleted from company: %O`, companyId);
    } else {
      throw Error('Logo url does not match company logo url');
    }
  } catch (err) {
    logger.error(`Could not delete logo from company: %O`, err.message);
    throw err;
  }
};
