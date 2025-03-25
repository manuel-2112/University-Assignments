/**
 * This module contains database operations of the Service entity
 */

import httpStatus from 'http-status';
import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';
import {
  addServiceToCompany,
  deleteServiceFromCompany,
  getAll as getAllVerifiedCompanies,
} from '@components/company/company.service';
import ServiceModel from './services.model';
import { IService } from './services.interface';

/**
 * Create new Service
 *
 * @param service - Service Interface
 * @returns Created Service
 * @throws If service was not created
 */
export const create = async (service: IService): Promise<IService> => {
  try {
    const newService = await ServiceModel.create(service);
    await addServiceToCompany(newService.companyId, newService._id);
    logger.debug(`Service created: %O`, newService);
    return newService;
  } catch (err) {
    logger.error(`Service create err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Service was not created!');
  }
};

/**
 * Find service from id
 *
 * @param serviceId - Service ID
 * @returns Service with indicated ID
 * @throws If service was not found
 */
export const read = async (serviceId: string): Promise<IService> => {
  logger.debug(`Sent service.id ${serviceId}`);
  const service = await ServiceModel.findById(serviceId);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'Service not found');
  }
  return service as IService;
};

/**
 * Find all services
 * @returns All services that are stored in companies
 */
export const getAll = async (): Promise<IService[]> => {
  const companies = await getAllVerifiedCompanies();
  const companiesIds: string[] = companies.map((c) => c._id);
  const services = await ServiceModel.find({
    companyId: { $in: companiesIds },
  });
  logger.debug(`Sent all services from verified companies`);
  return services as IService[];
};

/**
 * Retrieve every verified company name
 * @returns All verified companies names
 */
export const getNameMapping = async () => {
  const companies = await getAllVerifiedCompanies();
  const companiesData = {};
  companies.forEach((c) => {
    companiesData[c._id] = c.accountData.name;
  });
  return companiesData;
};

/**
 * Find services from company id
 *
 * @param companyId - Company ID
 * @returns Services with indicated Company ID
 * @throws If services were not able to be retrieved
 */
export const getServices = async (companyId: string): Promise<IService[]> => {
  try {
    const services = await ServiceModel.find({ companyId });
    return services;
  } catch (err) {
    logger.error(`Service get err: %O`, err.message);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Service was not able to be retrieved!',
    );
  }
};

/**
 * Update service by its Id
 *
 * @param service - Service Interface
 * @param serviceId - Service ID
 * @returns Confirmation message and updated service
 * @throws If service was not able to be updated
 */
export const update = async (
  service: IService,
  serviceId: string,
): Promise<IService> => {
  try {
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    const { _id, companyId, ...updateData } = service;
    const updatedService = await ServiceModel.findOneAndUpdate(
      { _id: serviceId },
      updateData,
      { new: true },
    );
    if (!updatedService) {
      throw new Error('Service not found');
    }
    logger.debug(`Service updated: %O`, updatedService);
    return updatedService;
  } catch (err) {
    logger.error(`Service update err: %O`, err.message);
    throw new AppError(httpStatus.BAD_REQUEST, 'Service was not updated!');
    /* eslint-enable-next-line @typescript-eslint/naming-convention */
  }
};

/**
 * Delete service by its Id and company Id
 *
 * @param companyId - Company ID
 * @param serviceId - Service ID
 * @returns Confirmation message
 * @throws If service was not deleted
 */
export const deleteById = async (
  companyId: string,
  serviceId: string,
): Promise<boolean> => {
  await deleteServiceFromCompany(companyId, serviceId);
  const deletedService = await ServiceModel.findByIdAndDelete(serviceId);
  if (!deletedService) {
    throw new Error('Service could not be deleted');
  }
  logger.debug(`Service ${serviceId} has been removed`);
  return true;
};

/**
 * Add image url to service
 *
 * @param serviceId - Service ID
 * @param imgUrl - Image url string
 * @returns Confirmation message
 * @throws If update could not be made
 */
export const addImage = async (serviceId: string, imgUrl: string) => {
  await ServiceModel.findByIdAndUpdate(
    serviceId,
    { $push: { imageLink: imgUrl } },
    { new: true },
  );
  logger.debug(`Added image to service ${serviceId}`);
};

/**
 * Delete image url to service
 *
 * @param serviceId - Service ID
 * @param imgUrl - Image url string
 * @returns Confirmation message and updated service
 * @throws If delete could not be made
 */
export const deleteImage = async (serviceId: string, imgUrl: string) => {
  const updatedService = await ServiceModel.findByIdAndUpdate(
    serviceId,
    { $pull: { imageLink: imgUrl } },
    { new: true },
  );
  logger.debug(`Removed image from service ${serviceId}`);
  return updatedService;
};
