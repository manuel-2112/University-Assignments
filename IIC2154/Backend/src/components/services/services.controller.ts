/**
 * This module contains the controller of the service entity.
 */

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { unauthorizedCompany } from '@components/authentication/auth.company';
import {
  create,
  read,
  getAll,
  update,
  deleteById,
  getServices,
  getNameMapping,
} from './services.service';
import { IService } from './services.interface';

/**
 * Create a service for company
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Confirmation message and created service
 * @throws If unauthorized or internal server error
 */
export const createService = async (req: Request, res: Response) => {
  try {
    const service = req.body as IService;
    service.companyId = req.params.company_id;
    const newService = await create(service);
    unauthorizedCompany(req, res);
    res.status(httpStatus.CREATED);
    return res.send({
      message: 'The service was created succesfully',
      service: newService,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    return res;
  }
};

/**
 * Retrieve a service from id
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Service from Id
 * @throws If internal server error
 */
export const readService = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.service_id;
    const service = await read(serviceId);
    res.status(httpStatus.OK);
    res.send({ service });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Retrieve every service
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Every service with random sorting and every company name
 * @throws If internal server error
 */
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services: IService[] = await getAll();
    const names = await getNameMapping();
    const compareRandom = () => Math.random() - 0.5;
    services.sort(compareRandom);
    res.status(httpStatus.OK).json({ service: services, names });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Retrieve every service
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Confirmation message and updated service
 * @throws If unauthorized or internal server error
 */
export const updateService = async (req: Request, res: Response) => {
  try {
    const service = req.body as IService;
    const serviceId = req.params.service_id;
    const updatedService = await update(service, serviceId);
    unauthorizedCompany(req, res);
    res.status(httpStatus.OK);
    res.send({ message: 'Service Updated', service: updatedService });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Delete service by Id
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Confirmation message
 * @throws If unauthorized or internal server error
 */
export const deleteService = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.company_id;
    const serviceId = req.params.service_id;
    await deleteById(companyId, serviceId);
    unauthorizedCompany(req, res);
    res.status(httpStatus.ACCEPTED);
    res.send({ message: 'Service removed' });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Retrieve every service of company
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns Company's services
 * @throws If internal server error
 */
export const getCompanyServices = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.company_id;
    const companyServices = await getServices(companyId);
    res.status(httpStatus.ACCEPTED);
    res.send({ service: companyServices });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};
