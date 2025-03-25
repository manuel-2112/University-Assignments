/**
 * This module contains the controller functions for the form structure component.
 */

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { unauthorizedCompany } from '@components/authentication/auth.company';
import {
  readFormStructure,
  createFormStructure,
  deleteFormStructure,
} from './formStructure.service';
import { IFormStructure } from './formStructure.interface';

/**
 * Retrieves the form structure for a specific company.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON object containing the form structure.
 * @throws If there is an error while retrieving the form structure.
 */
export const readCompanyFormStructure = async (req: Request, res: Response) => {
  try {
    const companyId = req.params.company_id;
    const formStructure: IFormStructure = await readFormStructure(companyId);
    res.status(httpStatus.OK);
    res.send({ formStructure });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Creates a form structure for a company.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A response indicating the success or failure of the operation.
 */
export const createCompanyFormStructure = async (
  req: Request,
  res: Response,
) => {
  try {
    const companyId = req.params.company_id;
    const formStructure: IFormStructure = req.body;
    const createdFormStructure = await createFormStructure(
      formStructure,
      companyId,
    );
    unauthorizedCompany(req, res);
    res.status(httpStatus.OK);
    res.send({
      message: 'Form Structure created',
      formStructure: createdFormStructure,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

/**
 * Deletes the form structure for a company.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A response indicating the success or failure of the operation.
 */
export const deleteCompanyFormStructure = async (
  req: Request,
  res: Response,
) => {
  try {
    const companyId = req.params.company_id;
    await deleteFormStructure(companyId);
    unauthorizedCompany(req, res);
    res.status(httpStatus.OK);
    res.send({ message: 'Form Structure deleted' });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};
